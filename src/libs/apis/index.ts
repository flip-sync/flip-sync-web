const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions<T> extends Omit<RequestInit, "body" | "method"> {
  data?: T;
}

class Api {
  private getAccessToken() {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );

    if (!tokenCookie) {
      console.log("Token not found in cookies:", cookies);
      return null;
    }

    const token = tokenCookie.split("=")[1]?.trim();
    return token;
  }

  private async refreshAccessToken() {
    try {
      const response = await fetch(`${BASE_URL}/user/login/refresh`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.code === "200_0") {
        document.cookie = `accessToken=${
          data.data.accessToken
        }; path=/; max-age=${15 * 60}; secure; samesite=lax`;
        return data.data.accessToken;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    method: string,
    options: RequestOptions<T> = {}
  ) {
    const { data, ...customOptions } = options;
    let accessToken = this.getAccessToken();

    const defaultOptions = {
      headers: {
        ...(method !== "GET" && { "Content-Type": "application/json" }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...customOptions.headers,
      },
      credentials: "include",
    };

    let url = `${BASE_URL}${endpoint}`;
    if (method === "GET" && data) {
      const queryParams = new URLSearchParams(data).toString();

      url = `${url}?${queryParams}`;
    }

    let response = await fetch(url, {
      ...defaultOptions,
      ...customOptions,
      method,
      ...(method !== "GET" && data && { body: JSON.stringify(data) }),
      credentials: "include",
    });

    // 401 에러시 토큰 갱신 시도
    if (response.status === 401) {
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        // 새 토큰으로 재시도
        defaultOptions.headers = {
          ...defaultOptions.headers,
          Authorization: `Bearer ${newToken}`,
        };
        response = await fetch(url, {
          ...defaultOptions,
          ...customOptions,
          method,
          ...(method !== "GET" && data && { body: JSON.stringify(data) }),
          credentials: "include",
        });
      } else {
        // 리프레시 실패시 로그인 페이지로
        window.location.href = "/login";
        return null;
      }
    }

    return response.json();
  }

  async get<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  async post<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "POST", options);
  }

  async put<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "PUT", options);
  }

  async delete<T>(endpoint: string, options: RequestOptions<T> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }
}

export const api = new Api();
