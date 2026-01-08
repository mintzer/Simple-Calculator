import React from 'react'
import ReactDOM from 'react-dom/client'

// Placeholder App component for now - will be replaced with Calculator in Task 3
function App() {
  return (
    <div>
      <h1>Simple Calculator</h1>
      <p>Under construction...</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
