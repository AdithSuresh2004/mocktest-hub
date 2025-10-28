import { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'

const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.error('ErrorBoundary caught error:', error, errorInfo)

    this.setState({
      errorInfo,
      errorId,
    })

    if (import.meta.env?.DEV) {
      console.warn('Error:', error)
      console.warn('Error Info:', errorInfo)
      console.warn('Error ID:', errorId)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackUI === 'inline') {
        return (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-red-300 bg-red-50 p-8 dark:border-red-700 dark:bg-red-900/20">
            <h2 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
              Error Loading Content
            </h2>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              {this.state.error?.message || DEFAULT_ERROR_MESSAGE}
            </p>
            {this.state.errorId && (
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Error ID: {this.state.errorId}
              </p>
            )}
            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                variant="primary"
                aria-label="Try again to reload content"
              >
                Try Again
              </Button>
              <Button
                as={Link}
                to="/"
                variant="secondary"
                aria-label="Navigate to home page"
              >
                Go Home
              </Button>
            </div>
          </div>
        )
      }

      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
          role="alert"
        >
          <div className="max-w-2xl text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="mb-4 text-4xl font-bold text-red-500">
              Something went wrong
            </h1>

            <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
              {this.state.error?.message || DEFAULT_ERROR_MESSAGE}
            </p>

            <p className="mb-8 text-gray-500 dark:text-gray-500">
              Don't worry, your data is safe. Try one of the options below:
            </p>

            {this.state.errorId && (
              <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
                Error ID:{' '}
                <code className="rounded bg-gray-200 px-2 py-1 dark:bg-gray-700">
                  {this.state.errorId}
                </code>
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                size="lg"
                aria-label="Reload the entire page"
              >
                🔄 Refresh Page
              </Button>

              <Button
                onClick={this.handleReset}
                variant="success"
                size="lg"
                aria-label="Try to recover from the error"
              >
                ↻ Try Again
              </Button>

              <Button
                as={Link}
                to="/"
                variant="secondary"
                size="lg"
                aria-label="Go to home page"
              >
                🏠 Go Home
              </Button>

              <Button
                as="a"
                href={`https://github.com/adith-ya/mocktest-hub/issues/new?title=Bug%20Report&body=Error%20ID:%20${this.state.errorId}%0A%0A**Error%20Message:**%0A${this.state.error?.message}%0A%0A**Component%20Stack:**%0A${this.state.errorInfo?.componentStack}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="danger"
                size="lg"
                aria-label="Report a bug on GitHub"
              >
                🐛 Report Bug
              </Button>
            </div>

            {import.meta.env?.DEV && this.state.errorInfo && (
              <details className="mt-8 w-full rounded-lg bg-gray-200 p-4 text-left dark:bg-gray-800">
                <summary className="cursor-pointer font-semibold text-red-600 dark:text-red-400">
                  🐛 Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-300">
                  {this.state.error && this.state.error.toString()}
                  {`

`}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary