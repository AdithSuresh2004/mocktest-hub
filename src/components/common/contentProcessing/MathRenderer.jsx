import { InlineMath, BlockMath } from 'react-katex'

const MathRenderer = ({ math, display = false, className = '' }) => {
  if (!math || math.trim() === '') {
    return <span className="mx-1 align-baseline">[Math formula]</span>
  }

  if (display) {
    return (
      <div className={`my-3 w-full overflow-x-auto ${className}`.trim()}>
        <BlockMath math={math} />
      </div>
    )
  }

  return (
    <span className={`mx-1 align-baseline ${className}`.trim()}>
      <InlineMath math={math} />
    </span>
  )
}

export default MathRenderer
