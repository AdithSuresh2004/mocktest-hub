import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          <h1 className="mb-4 text-4xl font-bold text-red-500">
            Oops! Something went wrong.
          </h1>
          <p className="mb-8 text-center text-lg">
            We're sorry for the inconvenience. Please try refreshing the page or
            go back home.
          </p>
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 w-full max-w-3xl rounded-lg bg-gray-200 p-4 text-left dark:bg-gray-800">
              <summary className="cursor-pointer font-semibold">
                Error Details (for development)
              </summary>
              <pre className="mt-2 overflow-auto text-sm whitespace-pre-wrap">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
