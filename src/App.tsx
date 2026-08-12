import { useState } from 'react'
import type { Scene } from './types/scene'
import { Home, OLL, PLL } from './scenes'
import { Header } from './components'

function App() {
  const [scene, setScene] = useState<Scene>("HOME")

  const renderScene = () => {
    switch (scene) {
      case "OLL":
        return (
          <>
            <Header changeScene={changeSceneCallback}/>
            <OLL />
          </>
        )
      case "PLL":
        return (
          <>
            <Header changeScene={changeSceneCallback}/>
            <PLL />
          </>
        )
      case "FULL":
      case "HOME":
        return <Home changeScene={changeSceneCallback}/>
    }
  }

  const changeSceneCallback = (newScene: Scene) => {
    setScene(newScene);
  }
  
  return (
    <>
      {renderScene()}
    </>
  )
}

export default App
