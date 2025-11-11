import React from "react";

interface TextRendererProps {
  text: string;
  className?: string;
}

const TextRenderer: React.FC<TextRendererProps> = ({
  text,
  className = "",
}) => {
  if (!text || !text.trim()) {
    return null;
  }

  const trimmed = text.trim();
  const hasNewlines = text.includes("\n");

  if (hasNewlines) {
    const paragraphs = text.split(/\n\s*\n/);
    if (paragraphs.length > 1) {
      return (
        <>
          {paragraphs
            .map((para, i) => {
              const cleaned = para.trim().replace(/\s+/g, " ");
              if (!cleaned) return null;
              return (
                <span key={`para-${i}`} className={`mb-2 block ${className}`}>
                  {cleaned}
                </span>
              );
            })
            .filter(Boolean)}
        </>
      );
    }

    const lines = text.split("\n").map((l) => l.trim());
    if (lines.length > 1) {
      return (
        <>
          {lines.map((line, i) => (
            <span key={`line-${i}`} className={`block ${className}`}>
              {line || "\u00A0"}
            </span>
          ))}
        </>
      );
    }
  }

  return <span className={className}>{trimmed.replace(/\s+/g, " ")}</span>;
};

export default TextRenderer;
