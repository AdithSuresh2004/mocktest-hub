import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const MathRenderer = ({ math, display = false, className = 'mx-1 inline-block align-middle' }) => {
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
}

export default MathRenderer
