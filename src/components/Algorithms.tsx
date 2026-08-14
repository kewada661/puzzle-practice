import { useAlgorithms, useAuth } from "../hooks";
import { useEffect, useState } from "react";
import type { Algorithm } from "../types"
import { AlgorithmCard } from "./AlgorithmCard";
import { useAlgContext } from "../context";
import { patchAlgorithms } from "../api/algorithms";

interface AlgorithmsProps {
  case_id: number;
}

export const Algorithms = ({ case_id }: AlgorithmsProps) => {
  const {
    algs,
    setAlgs,
    forDeletion,
    setForDeletion,
  } = useAlgContext();
  const { refreshSession } = useAuth();
  const [newAlg, setNewAlg] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const {
    loading: algsLoading,
    getAlgorithms,
    postAlgorithms,
    deleteAlgorithms
  } = useAlgorithms();

  const init = () => {
    getAlgorithms(case_id)
      .then((result) => {
        console.log(result);
        setAlgs(result ?? []);
      })
      .catch((e) => {
        console.error(e);
        if (e instanceof Error && e.name === "TokenExpiredError") {
          refreshSession()
            .then(()=> init())
            .catch((e)=> console.error(e));
        }
      });
  }
  useEffect(() => {
    init();
  }, [case_id]);

  const handlePlus = () => {
    setEditing(true);
  }

  const handleCheck = () => {
    let alg: Algorithm = {
      algorithm: newAlg,
      case_id: case_id
    }
    try {
      setAlgs(prev => [...prev, alg]);
    } catch (e) {

    } finally {
      setEditing(false)
    }
  }

  const handleSave = () => {
    setSaving(true);
    try {
      algs.forEach((item) => {
        try {
          if (item.alg_id) patchAlgorithms(item);
          else postAlgorithms(item);
        } catch (e) {
          throw e;
        }
      });
      forDeletion.forEach((item) => {
        try {
          deleteAlgorithms(item);
        } catch (e) {
          throw e;
        }
      })
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="w-400 justify-self-center"
    >
      {(algsLoading || saving) ? (
        <span>LOADING</span>
      ) : (
        <>
          <ul>
            {algs.map((item, i) => {
              return (
                <AlgorithmCard
                  algorithm={item}
                  index={i}
                />
              )
            })}
          </ul>
          {(editing) ? (
            <>
              <input
                className="text-purple-900 bg-purple-200 opacity-80 rounded p-1.5 placeholder:text-purple-400"
                onChange={(e) => setNewAlg(e.target.value)}
              />
              <button
                className="counter"
                onClick={handleCheck}
              >
                check
              </button>
            </>
          ) : (
            <button
              className="counter"
              onClick={handlePlus}
            >
              +
            </button>
          )}
          <button
            className="counter"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      )}
    </div>
  )
}