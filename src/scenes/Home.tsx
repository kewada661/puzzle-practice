import { useState } from 'react'
import type { Scene } from '../types'
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'
import '../Home.css'

interface HomeProps {
  changeScene: (scene: Scene) => void;
}

export const Home = ({changeScene}: HomeProps) => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => changeScene("OLL")}
        >
          Practice OLL
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => changeScene("PLL")}
        >
          Practice PLL
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}
