export interface ContentPart {
  type: "text" | "inline" | "block" | "table";
  content: string;
}

const BLOCK_MATH_PATTERN = /\$\$([^$]+?)\$\$/g;
const INLINE_MATH_PATTERN = /(?<!\$)\$(?!\$)([^$]+?)\$/g;

export const parseContent = (text: string): ContentPart[] => {
  if (!text) return [];

  const parts: ContentPart[] = [];
  let lastIndex = 0;

  const blockMatches = Array.from(text.matchAll(BLOCK_MATH_PATTERN));
  const inlineMatches = Array.from(text.matchAll(INLINE_MATH_PATTERN));

  const allMatches = [
    ...blockMatches.map((m) => ({
      index: m.index || 0,
      end: (m.index || 0) + m[0].length,
      type: "block" as const,
      content: m[1],
    })),
    ...inlineMatches.map((m) => ({
      index: m.index || 0,
      end: (m.index || 0) + m[0].length,
      type: "inline" as const,
      content: m[1],
    })),
  ].sort((a, b) => a.index - b.index);

  for (const match of allMatches) {
    if (match.index > lastIndex) {
      const between = text.substring(lastIndex, match.index);
      if (between.trim()) {
        parts.push({ type: "text", content: between });
      }
    }
    parts.push({ type: match.type, content: match.content });
    lastIndex = match.end;
  }

  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    if (remaining.trim()) {
      parts.push({ type: "text", content: remaining });
    }
  }

  return parts.length ? parts : [{ type: "text", content: text }];
};

export const isMathHeavy = (parts: ContentPart[]): boolean =>
  parts.filter((p) => p.type === "block" || p.type === "inline").length /
    Math.max(parts.length, 1) >
  0.3;
