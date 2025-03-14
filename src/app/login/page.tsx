"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InputField from "../components/AuthInputField";
import SocialLogin from "../components/SocialLogin";
import { userApi } from "../../libs/apis/user";
import { ApiError, API_CODE } from "@/type/api";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setError("이메일과 비밀번호를 입력해주세요.");
    }

    try {
      const response = await userApi.login({ email, password });

      if (response.data.code === API_CODE.SUCCESS) {
        const { accessToken, refreshToken } = response.data.data;

        document.cookie = `accessToken=${accessToken}; path=/; max-age=${
          30 * 60
        }; secure; samesite=lax`;
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure; samesite=lax`;

        router.push("/rooms");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiError>;
        setError(
          axiosError.response?.data?.message || "로그인에 실패했습니다."
        );
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <Image
          src="/appIcon.png"
          alt="appIcon"
          width={100}
          height={100}
          className="mx-auto my-8"
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="이메일"
            isClearable={email !== ""}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
            isClearable={password !== ""}
          />
          {error && <p className="text-[12px] text-red-400 ">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-center items-center gap-x-3 text-sm text-gray-600">
          <Link href="/sign-up" className="hover:text-primary">
            회원가입
          </Link>
          <div className="w-[1px] h-[22px] bg-gray-6" />
          <Link href="/forgot-password" className="hover:text-primary">
            비밀번호 찾기
          </Link>
        </div>
        <SocialLogin />
      </div>
    </div>
  );
}
