import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-8 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-slate-600">Please refresh the page. If the problem persists, try again later.</p>
            <button onClick={()=> window.location.reload()} className="mt-6 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800">Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
