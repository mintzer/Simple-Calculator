import React from 'react'
import ReactDOM from 'react-dom/client'
import './ui/styles/index.css'

// Placeholder App component for build verification
export function App() {
  return (
    <div>
      <h1>Simple Calculator</h1>
      <p>Calculator application - foundation setup complete</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
