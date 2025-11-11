import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  math: string;
  display?: boolean;
  className?: string;
}

const MathRenderer = ({
  math,
  display = false,
  className = "",
}: MathRendererProps) => {
  if (!math || math.trim() === "") {
    return null;
  }

  try {
    if (display) {
      return (
        <div className={`my-3 w-full overflow-x-auto ${className}`.trim()}>
          <BlockMath math={math} />
        </div>
      );
    }

    return (
      <span className={`mx-1 align-baseline ${className}`.trim()}>
        <InlineMath math={math} />
      </span>
    );
  } catch {
    return (
      <span className="mx-1 align-baseline text-red-500">[Math Error]</span>
    );
  }
};

export default MathRenderer;
