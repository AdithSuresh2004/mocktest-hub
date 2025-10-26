import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'

const MathRenderer = ({ math, display = false, className = 'mx-1 inline-block align-middle' }) => {
  if (!math || math.trim() === '') {
    return <span className={className}>[Math formula]</span>
  }

  try {
    if (display) {
      return (
        <div className={`my-3 text-left ${className}`}>
          <BlockMath math={math} />
        </div>
      )
    }

    return (
      <span className={`mx-1 inline-block align-middle ${className}`}>
        <InlineMath math={math} />
      </span>
    )
  } catch (error) {
    // Fallback for math rendering errors
    return null
  }
}

export default MathRenderer
