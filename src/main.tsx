import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Calculator } from './ui/components/Calculator'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
)
