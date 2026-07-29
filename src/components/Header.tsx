import type { Scene } from "../types"

interface HeaderProps {
  changeScene: (scene: Scene) => void;
}
export const Header = ({changeScene}: HeaderProps) => {

  return (
    <div className="flex flex-row gap-4">
      <button onClick={() => changeScene("OLL")}>
        OLL
      </button>
      <button onClick={() => changeScene("PLL")}>
        PLL
      </button>
      <button onClick={() => changeScene("HOME")}>
        home
      </button>
    </div>
  )
}