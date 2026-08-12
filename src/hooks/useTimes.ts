import { useState } from "react";
import type { Time } from "../types"
import { TimesAPI } from "../api";

interface useTimesResult {
  loading: boolean;
  error: Error | null;
  getTimes: (case_id: number) => Promise<[Time]>;
  getAverage: (case_id: number) => Promise<number>;
  getBest: (case_id: number) => Promise<number>;
  postTimes: (time: Time) => Promise<void>;
  patchTimes: (time: Time) => Promise<void>;
  deleteTimes: (time: Time) => Promise<void>;
}

export const useTimes = (): useTimesResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getTimes = async (case_id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await TimesAPI.getTimes(case_id);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Get times request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const getAverage = async (case_id: number) => {
    setLoading(true);
    setError(null);
    try {
      const time = await TimesAPI.getAverage(case_id);
      return time.ms_elapsed;
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Get times average request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const getBest = async (case_id: number) => {
    setLoading(true);
    setError(null);
    try {
      const time = await TimesAPI.getBest(case_id);
      return time.ms_elapsed;
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Get times best request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const postTimes = async (time: Time) => {
    setLoading(true);
    setError(null);
    try {
      return await TimesAPI.postTimes(time);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Post times request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const patchTimes = async (time: Time) => {
    setLoading(true);
    setError(null);
    try {
      return await TimesAPI.patchTimes(time);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Patch times request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const deleteTimes = async (time: Time) => {
    setLoading(true);
    setError(null);
    try {
      return await TimesAPI.deleteTimes(time);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Delete times request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    error,
    getTimes,
    getAverage,
    getBest,
    postTimes,
    patchTimes,
    deleteTimes
  }
}