import { api } from "../api";

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

export const authApi = {
  login: (data: ILoginParams) =>
    api.post("/auth/login", {
      data,
    }),

  verifyEmail: (email: string) => {
    api.get("/auth/verify-email", {
      data: { email },
    });
  },

  verifyEmailCheck: (email: string, code: string) => {
    api.post("/auth/verify-email/check", {
      data: { email, code },
    });
  },

  signUp: (data: ISignUpParams) =>
    api.post("/auth/signup", {
      data,
    }),
};
