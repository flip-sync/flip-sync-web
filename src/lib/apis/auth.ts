import { fetchApi } from "../api";

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
    fetchApi("/auth/login", {
      method: "POST",
      data,
    }),

  verifyEmail: (email: string) => {
    fetchApi("/auth/verify-email", {
      method: "POST",
      data: { email },
    });
  },

  verifyEmailCheck: (email: string, code: string) => {
    fetchApi("/auth/verify-email/check", {
      method: "POST",
      data: { email, code },
    });
  },

  signUp: (data: ISignUpParams) =>
    fetchApi("/auth/signup", {
      method: "POST",
      data,
    }),
};
