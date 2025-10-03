import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function MathText({ text, className = '' }) {
  if (!text) return null

  const parts = []
  let lastIndex = 0
  const blockMathRegex = /\$\$(.*?)\$\$/g
  const inlineMathRegex = /\$(.*?)\$/g
  
  const processedText = text.replace(blockMathRegex, (match, latex, offset) => {
    if (lastIndex < offset) {
      parts.push({ type: 'text', content: text.slice(lastIndex, offset) })
    }
    parts.push({ type: 'block', content: latex.trim() })
    lastIndex = offset + match.length
    return ''
  })

  let remaining = lastIndex === 0 ? text : text.slice(lastIndex)
  lastIndex = 0

  remaining.replace(inlineMathRegex, (match, latex, offset) => {
    if (lastIndex < offset) {
      parts.push({ type: 'text', content: remaining.slice(lastIndex, offset) })
    }
    parts.push({ type: 'inline', content: latex.trim() })
    lastIndex = offset + match.length
    return ''
  })

  if (lastIndex < remaining.length) {
    parts.push({ type: 'text', content: remaining.slice(lastIndex) })
  }

  if (parts.length === 0) {
    parts.push({ type: 'text', content: text })
  }

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.type === 'block') {
          return (
            <div key={index} className="my-4 text-left">
              <BlockMath math={part.content} />
            </div>
          )
        } else if (part.type === 'inline') {
          return <InlineMath key={index} math={part.content} />
        } else {
          return (
            <span key={index} className="whitespace-pre-wrap">
              {part.content}
            </span>
          )
        }
      })}
    </div>
  )
}
