import type { LoginCredentials, User } from "../types";
import { apiRequest } from "./client";

export const loginRequest = async (credentials: LoginCredentials): Promise<User> => {
  return apiRequest<User>("/auth/login", 
    {
      method: "POST",
      body: JSON.stringify(credentials)
    }
  )
}

export const logoutRequest = async (): Promise<void> => {
  return apiRequest<void>("/auth/logout");
}

export const refreshTokenRequest = async (): Promise<User> => {
  return apiRequest<User>("/auth/refresh");
}