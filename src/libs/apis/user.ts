import { baseUrl } from "./index";

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

export const userApi = {
  login: (data: ILoginParams) => {
    return baseUrl.post("/user/login", data);
  },

  verifyEmail: (email: string) => {
    return baseUrl.get("/user/verify-email", { email });
  },

  verifyEmailCheck: (email: string, code: string) => {
    return baseUrl.post("/user/verify-email/check", { email, code });
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
