import { useState } from "react";
import type { Grade } from "../types"
import { GradesAPI } from "../api";

interface useGradesResult {
  loading: boolean;
  error: Error | null;
  getGrades: (case_id: number) => Promise<Grade>;
  updateGrades: (grade: Grade) => Promise<void>;
}

export const useGrades = (): useGradesResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getGrades = async (case_id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await GradesAPI.getGrades(case_id);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Get grades request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const updateGrades = async (grade: Grade) {
    setLoading(true);
    setError(null);
    try {
      await GradesAPI.postGrades(grade)
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Update grades request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getGrades,
    updateGrades
  }
}