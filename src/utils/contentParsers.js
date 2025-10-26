export const parseMathInText = (text) => {
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

export const parseTableMarkdown = (text) => {
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

export const parseMathAndText = (text) => {
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

export const isMathHeavy = (parts) => {
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
