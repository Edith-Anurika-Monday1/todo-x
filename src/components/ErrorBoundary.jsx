import { Component } from 'react';
import { Button } from './ui/button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    this.setState({ hasError: false });
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto text-center mt-16">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong.</h2>
          <p className="mb-4 text-muted-foreground">Please try refreshing the page.</p>
          <Button variant="destructive" onClick={this.handleReload}>
            Reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
