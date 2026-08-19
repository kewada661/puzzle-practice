import { useState } from 'react';
import { Auth } from '../components';
// import reactLogo from '/src/assets/react.svg';
// import viteLogo from '/src/assets/vite.svg';
// import heroImg from '/src/assets/hero.png';
import '../Home.css';
import { useSceneContext } from '../context';

export const Home = () => {
  const {setScene} = useSceneContext();
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <Auth />
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
          onClick={() => setScene("OLL")}
        >
          Practice OLL
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => setScene("PLL")}
        >
          Practice PLL
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => changeScene("TIMES")}
        >
          View times
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}
