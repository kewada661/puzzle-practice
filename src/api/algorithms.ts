import { apiRequest } from "./client";
import type { Algorithm } from "../types";

export const getAlgorithms = async (case_id: number): Promise<Algorithm[]> => {
  return await apiRequest<Algorithm[]>(`/algorithms/${case_id}`,
    {
      method: "GET"
    }
  )
}

export const postAlgorithms = async (alg: Algorithm): Promise<void> => {
  return await apiRequest<any>(`/algorithms/${alg.case_id}`,
    {
      method: "POST",
      body: JSON.stringify({
        algorithm: alg.algorithm
      })
    }
  )
}

export const patchAlgorithms = async (alg: Algorithm): Promise<void> => {
  return await apiRequest<any>(`/algorithms/${alg.alg_id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        algorithm: alg.algorithm
      })
    }
  )
}

export const deleteAlgorithms = async (alg: Algorithm): Promise<void> => {
  return await apiRequest<any>(`/algorithms/${alg.alg_id}`,
    {
      method: "DELETE"
    }
  )
}