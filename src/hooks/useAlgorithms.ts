import { useState } from "react";
import type { Algorithm } from "../types";
import { AlgorithmsAPI } from "../api";

interface useAlgorithmsResults {
  loading: boolean;
  error: Error | null;
  getAlgorithms: (case_id: number) => Promise<[Algorithm]>;
  postAlgorithms: (alg: Algorithm) => Promise<void>;
  patchAlgorithms: (alg: Algorithm) => Promise<void>;
  deleteAlgorithms: (alg: Algorithm) => Promise<void>;
}

export const useAlgorithms = (): useAlgorithmsResults => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getAlgorithms = async (case_id: number) => {
    try {
      return await AlgorithmsAPI.getAlgorithms(case_id);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Get algorithms request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const postAlgorithms = async (alg: Algorithm) => {
    try {
      await AlgorithmsAPI.postAlgorithms(alg);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Post algorithms request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const patchAlgorithms = async (alg: Algorithm) => {
    try {
      await AlgorithmsAPI.patchAlgorithms(alg);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Patch algorithms request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const deleteAlgorithms = async (alg: Algorithm) => {
    try {
      await AlgorithmsAPI.deleteAlgorithms(alg);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Delete algorithms request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getAlgorithms,
    postAlgorithms,
    patchAlgorithms,
    deleteAlgorithms
  }
}