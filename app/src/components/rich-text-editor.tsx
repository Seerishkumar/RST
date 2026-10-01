"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
};

function ToolButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs font-bold transition ${
        active
          ? "border-[#0d2d5c] bg-[#0d2d5c] text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#0d2d5c] hover:text-[#0d2d5c]"
      }`}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({ value, onChange, label, placeholder, className = "" }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-[#0d2d5c] underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[180px] w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const nextContent = value || "";
    const currentContent = editor.getHTML();

    if (nextContent !== currentContent) {
      editor.commands.setContent(nextContent || "<p></p>", false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`rich-text-editor ${className}`.trim()}>
      {label ? <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label> : null}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-100 p-2">
          <ToolButton label="B" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
          <ToolButton label="I" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
          <ToolButton label="U" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
          <ToolButton label="S" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
          <ToolButton label="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
          <ToolButton label="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
          <ToolButton label="• List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
          <ToolButton label="1. List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
          <ToolButton label="Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} />
          <ToolButton label="Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} />
          <ToolButton label="Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} />
          <ToolButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
          <ToolButton label="Link" active={editor.isActive("link")} onClick={() => {
            const previousUrl = editor.getAttributes("link").href || "https://";
            const url = window.prompt("Enter a URL", previousUrl);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
          }} />
          <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()} />
          <ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()} />
          <ToolButton label="Clear" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
        </div>

        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
}
