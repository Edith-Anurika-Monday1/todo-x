import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1128] text-white">
          <h1 className="text-3xl font-bold mb-4 text-red-500">
            Something went wrong.
          </h1>
          <p className="text-gray-300 mb-6">Please reload the page and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold 
                       hover:bg-red-700 transition"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
