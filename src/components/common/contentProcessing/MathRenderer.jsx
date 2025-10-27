import { InlineMath, BlockMath } from 'react-katex'

const MathRenderer = ({ math, display = false, className = '' }) => {
  if (!math || math.trim() === '') {
    return <span className="mx-1 align-baseline">[Math formula]</span>
  }

  try {
    if (display) {
      return (
        <div className={`my-3 w-full overflow-x-auto ${className}`.trim()}>
          <BlockMath math={math} />
        </div>
      )
    }

    return (
      <span className={`align-baseline ${className}`.trim()}>
        <InlineMath math={math} />
      </span>
    )
  } catch (error) {
    return null
  }
}

export default MathRenderer
