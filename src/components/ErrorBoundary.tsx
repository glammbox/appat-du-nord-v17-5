import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#060E18',
          color: '#F0EDE6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-body)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', color: '#D4261C', marginBottom: '1rem' }}>
            APPÂT DU NORD
          </h1>
          <p style={{ color: '#8AAFCB', marginBottom: '1rem' }}>
            Chargement en cours...
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#D4261C',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 2rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Recharger
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
