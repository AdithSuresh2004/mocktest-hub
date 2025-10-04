import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // If this is a route-level error boundary, show smaller error UI
      if (this.props.fallbackUI === 'inline') {
        return (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-red-300 bg-red-50 p-8 dark:border-red-700 dark:bg-red-900/20">
            <h2 className="mb-2 text-2xl font-bold text-red-600 dark:text-red-400">
              Error Loading Content
            </h2>
            <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Go Home
              </Link>
            </div>
          </div>
        )
      }

      // Full-page error UI
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          <div className="max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-500">
              ⚠️ Oops! Something went wrong
            </h1>
            <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <p className="mb-8 text-gray-500 dark:text-gray-500">
              Don't worry, your data is safe. Try one of the options below:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
              >
                🔄 Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-green-700"
              >
                ↻ Try Again
              </button>
              <Link
                to="/"
                className="rounded-lg bg-gray-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-gray-700"
              >
                🏠 Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 w-full rounded-lg bg-gray-200 p-4 text-left dark:bg-gray-800">
                <summary className="cursor-pointer font-semibold text-red-600 dark:text-red-400">
                  🐛 Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-300">
                  {this.state.error && this.state.error.toString()}
                  {'\n\n'}
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
