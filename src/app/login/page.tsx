"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">로그인</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            로그인
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-600">
          <Link href="/signup" className="hover:text-blue-600">
            회원가입
          </Link>
          <Link href="/forgot-password" className="hover:text-blue-600">
            비밀번호 찾기
          </Link>
        </div>

        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500">
            <Image src="/kakao-logo.png" alt="Kakao" width={20} height={20} />
            카카오로 로그인
          </button>

          <button className="w-full py-2 px-4 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
            <Image src="/apple-logo.png" alt="Apple" width={20} height={20} />
            Apple로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
