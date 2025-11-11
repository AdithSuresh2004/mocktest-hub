# Test Creation Guide - Math & Formatting

## LaTeX Math Syntax

### Inline Math
Use single dollar signs: `$formula$`

**Examples:**
```json
"question_text": "Find the value of $x$ when $x^2 = 16$"
"text": "The answer is $x = 4$"
```

### Block Math
Use double dollar signs: `$$formula$$`

**Examples:**
```json
"question_text": "Solve: $$\\int_{0}^{1} x^2 dx$$"
"text": "$$\\frac{x^3}{3} + C$$"
```

## Common LaTeX Symbols

### Greek Letters
- `$\alpha$` → α
- `$\beta$` → β
- `$\gamma$` → γ
- `$\theta$` → θ
- `$\pi$` → π
- `$\sigma$` → σ
- `$\omega$` → ω

### Operators
- `$\times$` → ×
- `$\div$` → ÷
- `$\pm$` → ±
- `$\neq$` → ≠
- `$\leq$` → ≤
- `$\geq$` → ≥
- `$\approx$` → ≈

### Fractions
```latex
$$\frac{numerator}{denominator}$$
$$\frac{a + b}{c - d}$$
```

### Square Roots
```latex
$$\sqrt{x}$$
$$\sqrt[3]{x}$$  (cube root)
```

### Superscripts & Subscripts
```latex
$x^2$           (superscript)
$x_1$           (subscript)
$x_1^2$         (both)
$e^{2x}$        (multiple chars)
```

### Integrals
```latex
$$\int f(x) dx$$
$$\int_{a}^{b} f(x) dx$$
$$\iint$$  (double integral)
```

### Summation
```latex
$$\sum_{i=1}^{n} i$$
$$\sum_{i=0}^{\infty} \frac{1}{2^i}$$
```

### Limits
```latex
$$\lim_{x \to 0} \frac{\sin x}{x}$$
$$\lim_{n \to \infty} a_n$$
```

### Matrices
```latex
$$\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}$$
```

## Newline Support

### Simple Newlines
Use `\n` in JSON strings:
```json
{
  "question_text": "Solve the following:\n1. First equation\n2. Second equation"
}
```

### Natural Line Breaks
Or use actual line breaks (escaped in JSON):
```json
{
  "question_text": "Question line 1\nQuestion line 2\nQuestion line 3"
}
```

## Complete Question Examples

### Example 1: Calculus
```json
{
  "q_id": "M1",
  "question_text": "Evaluate the integral:\n$$\\int_0^1 x^2 dx$$",
  "options": [
    { "opt_id": "1", "text": "$$\\frac{1}{3}$$" },
    { "opt_id": "2", "text": "$$\\frac{1}{2}$$" },
    { "opt_id": "3", "text": "$$1$$" },
    { "opt_id": "4", "text": "$$\\frac{2}{3}$$" }
  ],
  "correct_opt_id": "1",
  "marks": 4,
  "negative_marks": 1
}
```

### Example 2: Algebra
```json
{
  "q_id": "M2",
  "question_text": "If $x^2 - 5x + 6 = 0$, find the roots:",
  "options": [
    { "opt_id": "1", "text": "$x = 1, 6$" },
    { "opt_id": "2", "text": "$x = 2, 3$" },
    { "opt_id": "3", "text": "$x = -2, -3$" },
    { "opt_id": "4", "text": "$x = 0, 5$" }
  ],
  "correct_opt_id": "2",
  "marks": 4,
  "negative_marks": 1
}
```

### Example 3: Trigonometry
```json
{
  "q_id": "M3",
  "question_text": "What is the value of $\\sin(30°)$?",
  "options": [
    { "opt_id": "1", "text": "$\\frac{1}{2}$" },
    { "opt_id": "2", "text": "$\\frac{\\sqrt{3}}{2}$" },
    { "opt_id": "3", "text": "$1$" },
    { "opt_id": "4", "text": "$\\frac{1}{\\sqrt{2}}$" }
  ],
  "correct_opt_id": "1",
  "marks": 4,
  "negative_marks": 1
}
```

### Example 4: Geometry
```json
{
  "q_id": "M4",
  "question_text": "Area of a circle with radius $r$ is:\n$$A = \\pi r^2$$\nFind area when $r = 7$ cm:",
  "options": [
    { "opt_id": "1", "text": "$49\\pi$ cm²" },
    { "opt_id": "2", "text": "$14\\pi$ cm²" },
    { "opt_id": "3", "text": "$7\\pi$ cm²" },
    { "opt_id": "4", "text": "$\\pi$ cm²" }
  ],
  "correct_opt_id": "1",
  "marks": 4,
  "negative_marks": 1
}
```

### Example 5: Matrix
```json
{
  "q_id": "M5",
  "question_text": "Find the determinant:\n$$\\begin{vmatrix} 2 & 3 \\\\ 4 & 5 \\end{vmatrix}$$",
  "options": [
    { "opt_id": "1", "text": "$-2$" },
    { "opt_id": "2", "text": "$2$" },
    { "opt_id": "3", "text": "$10$" },
    { "opt_id": "4", "text": "$-10$" }
  ],
  "correct_opt_id": "1",
  "marks": 4,
  "negative_marks": 1
}
```

## Special Characters Reference

| Symbol | LaTeX | Display |
|--------|-------|---------|
| Infinity | `\infty` | ∞ |
| Therefore | `\therefore` | ∴ |
| Because | `\because` | ∵ |
| Angle | `\angle` | ∠ |
| Degree | `^\circ` | ° |
| Perpendicular | `\perp` | ⊥ |
| Parallel | `\parallel` | ∥ |
| Subset | `\subset` | ⊂ |
| Union | `\cup` | ∪ |
| Intersection | `\cap` | ∩ |
| Empty Set | `\emptyset` | ∅ |
| Element of | `\in` | ∈ |
| Not Element | `\notin` | ∉ |
| For All | `\forall` | ∀ |
| Exists | `\exists` | ∃ |
| Nabla | `\nabla` | ∇ |
| Partial | `\partial` | ∂ |

## Tips for Test Creation

### 1. **Escape Backslashes**
In JSON, always use double backslash:
```json
"text": "$$\\frac{a}{b}$$"  ✅ Correct
"text": "$$\frac{a}{b}$$"   ❌ Wrong
```

### 2. **Mixed Content**
You can mix text and math:
```json
"question_text": "If $a = 2$ and $b = 3$, then $a^2 + b^2 = ?$"
```

### 3. **Multi-line Questions**
Use `\n` for structured questions:
```json
"question_text": "Given:\n$f(x) = x^2$\n$g(x) = 2x$\nFind $(f \\circ g)(x)$"
```

### 4. **Code Blocks**
For programming questions (without math):
```json
"question_text": "Output of:\nfor(i=0; i<5; i++)\n  print(i)"
```

### 5. **Tables in Text**
Use newlines for simple tables:
```json
"question_text": "Truth Table:\nA | B | A AND B\n0 | 0 | 0\n1 | 0 | 0"
```

## Testing Your LaTeX

Before adding to test files, verify your LaTeX at:
- https://katex.org/ (Official KaTeX demo)
- https://www.codecogs.com/latex/eqneditor.php

## Quick Reference: Common Formulas

```latex
Quadratic: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$

Pythagorean: $$a^2 + b^2 = c^2$$

Derivative: $$\frac{d}{dx}(x^n) = nx^{n-1}$$

Integral: $$\int x^n dx = \frac{x^{n+1}}{n+1} + C$$

Limit: $$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

Summation: $$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

Binomial: $$(a+b)^2 = a^2 + 2ab + b^2$$

Logarithm: $$\log_a(xy) = \log_a(x) + \log_a(y)$$
```

---

**Remember**: 
- Always test your questions in the app before finalizing
- Use the browser console to catch LaTeX errors
- Keep formulas simple and readable
- Verify on mobile screens too
