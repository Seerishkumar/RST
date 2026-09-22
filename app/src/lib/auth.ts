export const SESSION_COOKIE_NAME = "rst_session";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

function getAuthSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "rst-dev-secret-change-me";
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(value: string) {
  const normalized = value.replace(/\s+/g, "");
  const length = normalized.length;
  const output = new Uint8Array(length / 2);

  for (let index = 0; index < length; index += 2) {
    output[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return output;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  const base64 = globalThis.btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = globalThis.atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a[index] ^ b[index];
  }

  return mismatch === 0;
}

async function signMessage(message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toBase64Url(new Uint8Array(signature));
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iterations = 120000;
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hashBytes = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-512",
        salt,
        iterations,
      },
      keyMaterial,
      64 * 8,
    ),
  );

  return `${iterations}:${bytesToHex(salt)}:${bytesToHex(hashBytes)}`;
}

export async function verifyPassword(input: string, storedHash: string) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [iterationsPart, saltHex, originalHash] = storedHash.split(":");
  if (!iterationsPart || !saltHex || !originalHash) {
    return false;
  }

  const iterations = Number.parseInt(iterationsPart, 10);
  if (!Number.isFinite(iterations) || iterations <= 0) {
    return false;
  }

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(input),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hashBytes = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-512",
        salt: hexToBytes(saltHex),
        iterations,
      },
      keyMaterial,
      64 * 8,
    ),
  );

  const candidateHash = bytesToHex(hashBytes);
  return timingSafeEqual(
    new Uint8Array(encoder.encode(originalHash)),
    new Uint8Array(encoder.encode(candidateHash)),
  );
}

export async function createSessionToken(payload: Record<string, string | number>) {
  const header = toBase64Url(encoder.encode(JSON.stringify({ alg: "HS256", typ: "RST" })));
  const body = toBase64Url(
    encoder.encode(JSON.stringify({ ...payload, exp: Date.now() + SESSION_TTL_MS })),
  );
  const signature = await signMessage(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, body, signature] = parts;
  const expectedSignature = await signMessage(`${header}.${body}`);

  if (!timingSafeEqual(fromBase64Url(signature), fromBase64Url(expectedSignature))) {
    return null;
  }

  try {
    const parsed = JSON.parse(new TextDecoder().decode(fromBase64Url(body)));
    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getCookieValue(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) {
    return undefined;
  }

  const match = cookieHeader.split(";").find((entry) => entry.trim().startsWith(`${name}=`));
  if (!match) {
    return undefined;
  }

  return decodeURIComponent(match.trim().split("=")[1]);
}

export function createDefaultAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@rameshsofttechacademy.com",
    password: process.env.ADMIN_PASSWORD || "RSTadmin123",
  };
}
