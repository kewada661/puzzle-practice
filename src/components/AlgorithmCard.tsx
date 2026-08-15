import { useState } from "react"
import { useAlgContext } from "../context";
import type { Algorithm } from "../types";

interface AlgorithmCardProps {
  algorithm: Algorithm;
  index: number
}
export const AlgorithmCard = ({ algorithm, index }: AlgorithmCardProps) => {
  const {
    setAlgs,
    setForDeletion
  } = useAlgContext();
  const [editing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(algorithm.algorithm ?? "");

  const handlePencil = () => {
    setEditing(true);
  }

  const handleTrash = () => {
    console.log(algorithm);
    setForDeletion(prev => [...prev, algorithm])
    setAlgs(prev => prev.filter(item => item !== algorithm));
  }

  const handleSave = () => {
    try {
      setAlgs((prev) => {
        return prev.map((item) => {
          return item === algorithm ? {...item, algorithm: text} : item;
        })
      })
    } catch (e) {
      console.error(e);
    } finally {
      setEditing(false);
    }
  }
  return (
    <li className="flex justify-center">
      {(editing) ? (
        <>
          <input
            className="text-purple-900 bg-purple-200 opacity-80 rounded p-1.5 placeholder:text-purple-400"
            id={`alg_${index}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="counter"
            onClick={handleSave}
          >
            save
          </button>
        </>
      ) : (
        <>
          <div>{text}</div>
          <button
            className="counter"
            onClick={handlePencil}
          >
            pencil
          </button>
          <button
            className="counter"
            onClick={handleTrash}
          >
            trash can
          </button>
        </>
      )}

    </li>
  )
}