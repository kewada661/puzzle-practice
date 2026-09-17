import type { Grade } from "../types";
import { apiRequest } from "./client";

export const getUserGrades = (): Promise<Grade[]> => {
  return apiRequest<Grade[]>(`/grades`,
    {
      method: "GET"
    }
  )
}

export const getGrades = (case_id: number): Promise<Grade> => {
  return apiRequest<Grade>(`/grades/${case_id}`,
    {
      method: "GET",
    }
  )
}

export const postGrades = (grade: Grade): Promise<void> => {
  return apiRequest<void>(`/grades/${grade.case_id}`,
    {
      method: "POST",
      body: JSON.stringify({
        grade: grade.grade
      })
    }
  )
}