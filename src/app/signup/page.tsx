"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import VerificationInput from "./components/VerificationInput";
import SocialLogin from "../components/SocialLogin";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const isFormValid =
    email &&
    verificationCode &&
    password &&
    passwordConfirm &&
    name &&
    password === passwordConfirm;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: 회원가입 API 호출
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <form onSubmit={handleSignup} className="space-y-4">
          <VerificationInput
            email={email}
            onEmailChange={setEmail}
            verificationCode={verificationCode}
            onVerificationChange={setVerificationCode}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            placeholder="비밀번호 확인"
          />
          <InputField
            label="이름"
            type="text"
            value={name}
            onChange={setName}
            placeholder="이름"
          />
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-lg ${
              isFormValid
                ? "bg-primary text-white"
                : "bg-gray-6 text-gray-4 cursor-not-allowed"
            }`}
          >
            가입하기
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-6" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-4">간편 회원가입</span>
          </div>
        </div>
        <SocialLogin />
      </div>
    </div>
  );
}
