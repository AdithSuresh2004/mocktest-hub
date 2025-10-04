import { memo, useMemo } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const parseMathAndText = (text) => {
  if (!text) return []

  const parts = []
  let currentPos = 0

  while (currentPos < text.length) {
    const blockStart = text.indexOf('$$', currentPos)
    
    if (blockStart !== -1) {
      if (blockStart > currentPos) {
        parts.push({ type: 'text', content: text.slice(currentPos, blockStart) })
      }
      
      const blockEnd = text.indexOf('$$', blockStart + 2)
      if (blockEnd !== -1) {
        const latex = text.slice(blockStart + 2, blockEnd)
        parts.push({ type: 'block', content: latex.trim() })
        currentPos = blockEnd + 2
        continue
      }
    }
    
    const inlineStart = text.indexOf('$', currentPos)
    
    if (inlineStart !== -1 && inlineStart !== blockStart) {
      if (inlineStart > currentPos) {
        parts.push({ type: 'text', content: text.slice(currentPos, inlineStart) })
      }
      
      const inlineEnd = text.indexOf('$', inlineStart + 1)
      if (inlineEnd !== -1) {
        const latex = text.slice(inlineStart + 1, inlineEnd)
        parts.push({ type: 'inline', content: latex.trim() })
        currentPos = inlineEnd + 1
        continue
      }
    }
    
    if (currentPos < text.length) {
      parts.push({ type: 'text', content: text.slice(currentPos) })
    }
    break
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

const formatText = (text) => {
  if (!text) return null
  
  // Check if text contains newlines
  const hasNewlines = text.includes('\n')
  
  if (!hasNewlines) {
    // No newlines - render inline with tab support
    return text.replace(/\t/g, '    ')
  }
  
  // Has newlines - render as blocks
  const lines = text.split('\n')
  
  return lines.map((line, lineIndex) => {
    const processedLine = line.replace(/\t/g, '    ')
    
    return (
      <span key={`line-${lineIndex}`} className="block">
        {processedLine || '\u00A0'}
      </span>
    )
  })
}

function MathText({ text, className = '' }) {
  const parts = useMemo(() => parseMathAndText(text), [text])

  if (!text) return null

  return (
    <div className={className}>
      {parts.map((part, index) => {
        switch (part.type) {
          case 'block':
            return (
              <div key={`block-${index}`} className="my-3">
                <BlockMath math={part.content} />
              </div>
            )
          case 'inline':
            return <InlineMath key={`inline-${index}`} math={part.content} />
          default:
            return (
              <span key={`text-${index}`}>
                {formatText(part.content)}
              </span>
            )
        }
      })}
    </div>
  )
}

export default memo(MathText)
