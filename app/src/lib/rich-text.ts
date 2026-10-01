export function sanitizeRichTextHtml(value?: string | null): string {
  if (!value) {
    return "";
  }

  const normalized = String(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/data:text\/html/gi, "");

  return normalized;
}
