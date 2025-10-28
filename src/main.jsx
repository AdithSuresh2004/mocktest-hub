import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import '@/index.css'
import 'katex/dist/katex.min.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ErrorBoundary from '@/components/common/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </ThemeProvider>
)