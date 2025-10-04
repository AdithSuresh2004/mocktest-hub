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

// Heuristic to detect if content is primarily mathematical
const isMathHeavy = (parts) => {
  const mathParts = parts.filter(p => p.type !== 'text').length
  const totalParts = parts.length
  const textParts = parts.filter(p => p.type === 'text')
  const totalTextLength = textParts.reduce((sum, p) => sum + p.content.length, 0)

  return (
    mathParts / totalParts > 0.6 ||
    totalTextLength < 20 ||
    textParts.every(p => /^[\s,;.?!:]*$/.test(p.content))
  )
}

// Smart text formatting with better heuristics
const formatText = (text, isInMathContext, isLastPart, isFirstPart) => {
  if (!text) return null

  const trimmed = text.trim()
  if (!trimmed) {
    if (isInMathContext && !isLastPart && !isFirstPart) {
      return ' '
    }
    return null
  }

  const hasSignificantNewlines =
    /\n.*\n/.test(text) ||
    (text.startsWith('\n') && text.length > 1) ||
    (text.endsWith('\n') && text.length > 1)

  if (isInMathContext && !hasSignificantNewlines) {
    return trimmed.replace(/\s+/g, ' ')
  }

  if (hasSignificantNewlines) {
    const paragraphs = text.split(/\n\s*\n/)

    if (paragraphs.length > 1) {
      return paragraphs
        .map((para, i) => {
          const cleaned = para.trim().replace(/\s+/g, ' ')
          if (!cleaned) return null
          return (
            <span key={`para-${i}`} className="block mb-2">
              {cleaned}
            </span>
          )
        })
        .filter(Boolean)
    }

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length > 1) {
      return lines.map((line, i) => (
        <span key={`line-${i}`} className="block">
          {line}
        </span>
      ))
    }
  }

  return trimmed.replace(/\s+/g, ' ')
}

function FormattedContent({ text, className = '' }) {
  const parts = useMemo(() => parseMathAndText(text), [text])
  const mathHeavy = useMemo(() => isMathHeavy(parts), [parts])

  if (!text) return null

  return (
    <div className={className}>
      {parts.map((part, index) => {
        const isFirst = index === 0
        const isLast = index === parts.length - 1

        switch (part.type) {
          case 'block': {
            // 👇 Inline fallback for small/simple math
            const shouldInline = mathHeavy || part.content.length < 40
            return shouldInline ? (
              <span key={`block-${index}`} className="inline-block align-middle mx-1">
                <InlineMath math={part.content} />
              </span>
            ) : (
              <div key={`block-${index}`} className="my-3 text-center">
                <BlockMath math={part.content} />
              </div>
            )
          }
          case 'inline':
            return (
              <span key={`inline-${index}`} className="inline-block align-middle mx-1">
                <InlineMath math={part.content} />
              </span>
            )
          default: {
            const formattedText = formatText(part.content, mathHeavy, isLast, isFirst)
            if (!formattedText) return null

            return (
              <span key={`text-${index}`} className={mathHeavy ? 'inline' : ''}>
                {formattedText}
              </span>
            )
          }
        }
      })}
    </div>
  )
}

export default memo(FormattedContent)
