import { baseUrl } from "./index";
import { ApiResponse, ApiError } from "@/type/api";

interface ILoginParams {
  email: string;
  password: string;
}

interface ISignUpParams {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

interface IResetPasswordParams {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const userApi = {
  login: (data: LoginRequest) => {
    return baseUrl.post<ApiResponse<LoginResponse>>("/user/login", data);
  },

  verifyEmail: (email: string) => {
    return baseUrl.get("/user/verify-email", {
      data: { email },
    });
  },

  verifyEmailCheck: (email: string, code: string) => {
    return baseUrl.post("/user/verify-email/check", {
      data: { email, code },
    });
  },

  signUp: (data: ISignUpParams) => {
    return baseUrl.post("/user/signup", {
      data,
    });
  },

  resetPassword: (data: IResetPasswordParams) => {
    return baseUrl.post("/user/reset-password", {
      data,
    });
  },

  refreshToken: () => {
    return baseUrl.post("/user/login/refresh", {
      data: {},
    });
  },
};
