import { useSceneContext } from "../context"

export const Header = () => {
  const { setScene } = useSceneContext();

  return (
    <div className="flex flex-row gap-4">
      <button onClick={() => setScene("OLL")}>
        OLL
      </button>
      <button onClick={() => setScene("PLL")}>
        PLL
      </button>
      <button onClick={() => setScene("HOME")}>
        home
      </button>
    </div>
  )
}