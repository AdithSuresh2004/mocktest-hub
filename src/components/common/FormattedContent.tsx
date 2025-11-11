import MathRenderer from "@/components/common/contentProcessing/MathRenderer";
import TableRenderer from "@/components/common/contentProcessing/TableRenderer";
import TextRenderer from "@/components/common/contentProcessing/TextRenderer";
import { parseContent, isMathHeavy } from "@/utils/parsers";

interface FormattedContentProps {
  text: string;
  className?: string;
}

const FormattedContent = ({ text, className = "" }: FormattedContentProps) => {
  const parts = parseContent(text);
  const mathHeavy = isMathHeavy(parts);

  if (!text) return null;

  return (
    <div className={`min-w-0 ${className}`}>
      {parts.map((part, index) => {
        switch (part.type) {
          case "block":
            return (
              <MathRenderer
                key={`block-${index}`}
                math={part.content}
                display={!mathHeavy && part.content.length >= 40}
              />
            );

          case "inline":
            return (
              <MathRenderer
                key={`inline-${index}`}
                math={part.content}
                display={false}
              />
            );

          case "table":
            return (
              <TableRenderer key={`table-${index}`} content={part.content} />
            );

          default:
            return (
              <TextRenderer
                key={`text-${index}`}
                text={part.content}
                className={mathHeavy ? "inline" : ""}
              />
            );
        }
      })}
    </div>
  );
};

export default FormattedContent;
