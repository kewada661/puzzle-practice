import type { User } from "../types";
import { apiRequest } from "./client";

export const getUserRequest = async (user_id: number): Promise<User> => {
  return apiRequest<User>(`users/${user_id}`, 
    {
      method: "GET",
    }
  )
}
