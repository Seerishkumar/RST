import { sanitizeRichTextHtml } from "@/lib/rich-text";

type RichTextBlockProps = {
  html?: string | null;
  className?: string;
};

export function RichTextBlock({ html, className = "" }: RichTextBlockProps) {
  return (
    <div
      className={`rich-text-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(html) }}
    />
  );
}
