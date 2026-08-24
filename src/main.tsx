// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider, SceneContextProvider } from './context'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthContextProvider>
      <SceneContextProvider>
        <App />
      </SceneContextProvider>
    </AuthContextProvider>
  // </StrictMode>,
)
