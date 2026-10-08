import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <AlertTriangle size={42} aria-hidden="true" />
          <h1>O sinal caiu.</h1>
          <p>Algo interrompeu esta sessão. Recarregue para tentar novamente.</p>
          <details>
            <summary>Detalhes técnicos</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button type="button" onClick={() => window.location.reload()} className="radio-button dark-button">
            <RotateCcw size={16} /> recarregar
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
