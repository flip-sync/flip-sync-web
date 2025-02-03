"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "../../lib/components/InputField";
import SocialLogin from "../../lib/components/SocialLogin";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();

    //   document.cookie = `token=${data.token}; path=/`;

    //   router.push("/rooms");
    // } catch (error) {
    //   console.error(error);
    // }
    router.push("/rooms");
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
