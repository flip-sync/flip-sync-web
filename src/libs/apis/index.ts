import axios from "axios";

const NETDBG = true;
export const API_PREFIX = process.env.NEXT_PUBLIC_API_BASE_URL;

const _baseUrlImp = axios.create({
  baseURL: API_PREFIX,
});

const request = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data: any = {},
  props: any = {}
) => {
  if (method === "get") {
    const resp = await _baseUrlImp[method](url, { params: data });
    return resp;
  }

  const resp = await _baseUrlImp[method](url, data);
  return resp;
};

const _baseUrlDbg = {
  get: (url: string, params: any = {}) => request("get", url, params),
  post: (url: string, data: any, props: any = {}) =>
    request("post", url, data, props),
  put: (url: string, data: any) => request("put", url, data),
  delete: (url: string, data: any = {}) => request("delete", url, data),
  patch: (url: string, data: any) => request("patch", url, data),
};

export const baseUrl = NETDBG ? _baseUrlDbg : _baseUrlImp;
