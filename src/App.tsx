import { Home, OLL, PLL } from './scenes'
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
