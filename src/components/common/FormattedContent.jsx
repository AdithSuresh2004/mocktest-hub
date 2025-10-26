import React from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

const parseTableMarkdown = (text) => {
  const lines = text.split('\n')
  const parts = []
  let currentTableLines = []
  let inTable = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.includes('|') && line.split('|').length > 2) {
      if (!inTable) {
        inTable = true
        currentTableLines = []
      }
      currentTableLines.push(line)
    } else {
      if (inTable) {
        parts.push({ type: 'table', content: currentTableLines })
        currentTableLines = []
        inTable = false
      }
      if (line) {
        parts.push({ type: 'text', content: line + '\n' })
      }
    }
  }
  if (inTable && currentTableLines.length > 0) {
    parts.push({ type: 'table', content: currentTableLines })
  }
  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

const parseMathAndText = (text) => {
  if (!text) return []
  if (text.includes('|') && text.includes('\n')) {
    const tableParts = parseTableMarkdown(text)
    let finalParts = []
    for (const part of tableParts) {
      if (part.type === 'text') {
        const mathParts = parseMathInText(part.content)
        finalParts.push(...mathParts)
      } else {
        finalParts.push(part)
      }
    }
    return finalParts
  } else {
    return parseMathInText(text)
  }
}

const parseMathInText = (text) => {
  const parts = []
  let currentPos = 0
  while (currentPos < text.length) {
    const blockStart = text.indexOf('$$', currentPos)
    if (blockStart !== -1) {
      if (blockStart > currentPos) {
        parts.push({
          type: 'text',
          content: text.slice(currentPos, blockStart),
        })
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
        parts.push({
          type: 'text',
          content: text.slice(currentPos, inlineStart),
        })
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

const isMathHeavy = (parts) => {
  const mathParts = parts.filter((p) => p.type !== 'text').length
  const totalParts = parts.length
  const textParts = parts.filter((p) => p.type === 'text')
  const totalTextLength = textParts.reduce(
    (sum, p) => sum + p.content.length,
    0
  )
  return (
    mathParts / totalParts > 0.6 ||
    totalTextLength < 20 ||
    textParts.every((p) => /^[\s,;.?!:]*$/.test(p.content))
  )
}

const formatText = (text, isInMathContext, isLastPart, isFirstPart) => {
  if (!text) return null
  const trimmed = text.trim()
  if (!trimmed) {
    if (isInMathContext && !isLastPart && !isFirstPart) {
      return ' '
    }
    return null
  }
  const hasNewlines = text.includes('\n')
  if (isInMathContext && !hasNewlines) {
    return trimmed.replace(/\s+/g, ' ')
  }
  if (hasNewlines) {
    const paragraphs = text.split(/\n\s*\n/)
    if (paragraphs.length > 1) {
      return paragraphs
        .map((para, i) => {
          const cleaned = para.trim().replace(/\s+/g, ' ')
          if (!cleaned) return null
          return (
            <span key={`para-${i}`} className="mb-2 block">
              {cleaned}
            </span>
          )
        })
        .filter(Boolean)
    }
    const lines = text.split('\n').map((l) => l.trim())
    if (lines.length > 1) {
      return lines.map((line, i) => (
        <span key={`line-${i}`} className="block">
          {line || '\u00A0'}
        </span>
      ))
    }
  }
  return trimmed.replace(/\s+/g, ' ')
}

const FormattedContent = ({ text, className = '' }) => {
  const parts = parseMathAndText(text)
  const mathHeavy = isMathHeavy(parts)

  if (!text) return null

  return (
    <div className={className}>
      {parts.map((part, index) => {
        const isFirst = index === 0
        const isLast = index === parts.length - 1
        switch (part.type) {
          case 'block': {
            const shouldInline = mathHeavy || part.content.length < 40
            return shouldInline ? (
              <span
                key={`block-${index}`}
                className="mx-1 inline-block align-middle"
              >
                <InlineMath math={part.content} />
              </span>
            ) : (
              <div key={`block-${index}`} className="my-3 text-left">
                <BlockMath math={part.content} />
              </div>
            )
          }
          case 'inline':
            return (
              <span
                key={`inline-${index}`}
                className="mx-1 inline-block align-middle"
              >
                <InlineMath math={part.content} />
              </span>
            )
          case 'table':
            return (
              <div key={`table-${index}`} className="my-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 dark:divide-gray-700 dark:border-gray-600">
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {part.content
                      .map((row, rowIndex) => {
                        const cells = row
                          .split('|')
                          .filter((cell) => cell.trim() !== '')
                          .map((cell) => cell.trim())
                        const isHeaderRow =
                          rowIndex === 0 ||
                          (rowIndex === 1 &&
                            cells.every((cell) => cell.match(/^:?-+:?$/)))
                        if (
                          isHeaderRow &&
                          cells.every((cell) => cell.match(/^:?-+:?$/))
                        ) {
                          return null
                        }
                        return (
                          <tr
                            key={rowIndex}
                            className={
                              isHeaderRow ? 'bg-gray-50 dark:bg-gray-700' : ''
                            }
                          >
                            {cells.map((cell, cellIndex) => {
                              const CellTag = isHeaderRow ? 'th' : 'td'
                              return (
                                <CellTag
                                  key={cellIndex}
                                  className={`px-3 py-2 text-sm ${
                                    isHeaderRow
                                      ? 'font-medium text-gray-900 dark:text-gray-100'
                                      : 'text-gray-700 dark:text-gray-300'
                                  } border-r border-gray-200 last:border-r-0 dark:border-gray-600`}
                                >
                                  <FormattedContent
                                    text={cell}
                                    className="inline"
                                  />
                                </CellTag>
                              )
                            })}
                          </tr>
                        )
                      })
                      .filter(Boolean)}
                  </tbody>
                </table>
              </div>
            )
          default: {
            const formattedText = formatText(
              part.content,
              mathHeavy,
              isLast,
              isFirst
            )
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

export default FormattedContent
