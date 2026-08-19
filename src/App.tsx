import { useState } from 'react'
import type { Scene } from './types/scene'
import {
  Home,
  OLL,
  PLL,
  Times
} from './scenes'
import { Header } from './components'
import { useSceneContext } from './context'

function App() {
  const { scene } = useSceneContext();

  const renderScene = () => {
    switch (scene) {
      case "OLL":
        return (
          <>
            <Header />
            <OLL />
          </>
        )
      case "PLL":
        return (
          <>
            <Header />
            <PLL />
          </>
        )
      case "TIMES":
        return (
          <>
            <Header />
            <Times />
          </>
        )
      case "FULL":
      case "HOME":
        return <Home />
    }
  }

  return (
    <>
      {renderScene()}
    </>
  )
}

export default App
