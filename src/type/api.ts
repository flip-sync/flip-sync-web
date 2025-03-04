export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface ApiError {
  code: string;
  message: string;
}

export const API_CODE = {
  SUCCESS: "200_0",
  INVALID_TOKEN: "401_0",
  INVALID_PASSWORD: "401_1",
  ACCOUNT_LOCKED: "401_2",
} as const;
