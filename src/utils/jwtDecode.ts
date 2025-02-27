import { jwtDecode } from "jwt-decode";
export interface IToken {
  token: string | null;
  userId: number | null;
}
export interface ITokenDecode {
  exp: number;
  sub: string;
}

export const isAuth = (token: string | null) => {
  if (!token) {
    return false;
  }
  try {
    const decoded: ITokenDecode = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const getUserId = (token: string | null) => {
  if (!token) {
    return "";
  }
  const decoded: ITokenDecode = jwtDecode(token);
  return decoded.sub;
};
