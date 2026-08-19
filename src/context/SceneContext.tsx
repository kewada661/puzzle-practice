import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react";
import type { Scene } from "../types"

interface SceneContextValue {
  scene: Scene;
  setScene: React.Dispatch<SetStateAction<Scene>>;
}

const SceneContext = createContext<SceneContextValue | undefined>(undefined);

export const SceneContextProvider = ({ children }: { children: ReactNode }) => {
  const [scene, setScene] = useState<Scene>("HOME");

  return (
    <SceneContext.Provider
      value={{
        scene,
        setScene
      }}
    >
      {children}
    </SceneContext.Provider>
  )
}

export const useSceneContext = () => {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error("useSceneContext must be used inside SceneContextProvider");
  }
  return context;
}