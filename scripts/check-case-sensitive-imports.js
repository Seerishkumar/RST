#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []){
  const files = fs.readdirSync(dir);
  files.forEach(function(file){
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if(stat.isDirectory()) walk(filepath, filelist);
    else filelist.push(filepath);
  });
  return filelist;
}

function normalize(p){
  return p.replace(/\\/g, '/');
}

function fileExistsCaseSensitive(target){
  // Walk up the path and check exact casing at each segment
  const parts = target.split(/[/\\]+/).filter(Boolean);
  let cur = path.isAbsolute(target) ? path.sep : '.';
  for(const part of parts){
    const entries = fs.readdirSync(cur || '.');
    const match = entries.find(e => e === part);
    if(!match) return false;
    cur = path.join(cur, match);
  }
  return true;
}

function scanImports(root){
  const exts = ['.js','.jsx','.ts','.tsx','.mjs','.cjs'];
  const files = walk(root).filter(f => exts.includes(path.extname(f)));
  const importRegex = /(?:from\s+|require\()\s*["'](.+?)["']/g;
  const issues = [];
  for(const file of files){
    const content = fs.readFileSync(file,'utf8');
    let m;
    while((m = importRegex.exec(content)) !== null){
      let imp = m[1];
      if(imp.startsWith('.') ){
        // resolve path
        const resolved = path.resolve(path.dirname(file), imp);
        // try extensions and index
        const candidates = [];
        exts.forEach(ext => candidates.push(resolved + ext));
        candidates.push(path.join(resolved, 'index.js'));
        candidates.push(path.join(resolved, 'index.jsx'));
        candidates.push(path.join(resolved, 'index.ts'));
        candidates.push(path.join(resolved, 'index.tsx'));
        const found = candidates.find(c => fs.existsSync(c));
        if(found){
          // check case sensitive existence
          const rel = path.relative(process.cwd(), found);
          try{
            if(!fileExistsCaseSensitive(path.resolve(found))){
              issues.push({file: path.relative(process.cwd(), file), import: imp, target: rel});
            }
          }catch(err){
            // ignore
          }
        }
      }
    }
  }
  return issues;
}

const root = path.join(process.cwd(), 'app', 'src');
if(!fs.existsSync(root)){
  console.error('No app/src directory found — run this from the repo root of the project with an app/src folder.');
  process.exit(1);
}

console.log('Scanning imports under', root);
const issues = scanImports(root);
if(issues.length===0){
  console.log('No case-sensitive import issues found.');
  process.exit(0);
}
console.log('Found potential case-sensitive import issues:');
issues.forEach(i=> console.log(`- ${i.file}: imports '\${i.import}\' -> resolved ${i.target}`));
process.exit(2);
