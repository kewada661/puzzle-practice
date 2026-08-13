import type { Time } from "../types"
import { apiRequest } from "./client"

export const getTimes = async (case_id: number): Promise<Time[]> => {
  return await apiRequest<Time[]>(`/times/${case_id}`,
    {
      method: "GET"
    }
  )
}

export const getAverage = async (case_id: number): Promise<Time> => {
  return await apiRequest<Time>(`/times/${case_id}/average`,
    {
      method: "GET"
    }
  )
}

export const getBest = async (case_id: number): Promise<Time> => {
  return await apiRequest<Time>(`/times/${case_id}/best`,
    {
      method: "GET"
    }
  )
}

export const postTimes = async (time: Time): Promise<void> => {
  await apiRequest<any>(`/times/${time.case_id}`,
    {
      method: "POST",
      body: JSON.stringify({
        ms_elapsed: time.ms_elapsed
      })
    }
  )
}

export const patchTimes = async (time: Time): Promise<void> => {
  await apiRequest<any>(`/times/${time.time_id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        ms_elapsed: time.ms_elapsed
      })
    }
  )
}

export const deleteTimes = async (time: Time): Promise<void> => {
  await apiRequest<[Time]>(`/times/${time.time_id}`,
    {
      method: "DELETE"
    }
  )
}

