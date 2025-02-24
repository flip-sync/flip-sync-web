import { api } from ".";

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
    return api.post("/user/login", {
      data,
    });
  },

  verifyEmail: (email: string) => {
    return api.get("/user/verify-email", {
      data: { email },
    });
  },

  verifyEmailCheck: (email: string, code: string) => {
    return api.post("/user/verify-email/check", {
      data: { email, code },
    });
  },

  signUp: (data: ISignUpParams) => {
    return api.post("/user/signup", {
      data,
    });
  },

  resetPassword: (data: IResetPasswordParams) => {
    return api.post("/user/reset-password", {
      data,
    });
  },

  refreshToken: () => {
    return api.post("/user/login/refresh");
  },
};
