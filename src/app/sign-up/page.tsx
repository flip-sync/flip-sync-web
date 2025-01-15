"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../components/InputField";
import VerificationInput from "./components/VerificationInput";
import SocialLogin from "../components/SocialLogin";
import CheckInputField from "../components/checkInputField";
import { useModal } from "../hooks/useModal";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);
  const { openModal, closeModal } = useModal();

  const isFormValid =
    email &&
    verificationCode &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    name;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: 회원가입 API 호출

    // 회원가입 완료 모달 열기
    openModal("signupComplete", {
      onClick: () => {
        closeModal();
        router.push("/login");
      },
    });
  };

  const passwordRules = [
    {
      validate: (value: string) => value.length >= 8,
      message: "비밀번호는 8자 이상이어야 합니다.",
    },
    {
      validate: (value: string) => /[A-Z]/.test(value),
      message: "대문자를 포함해야 합니다.",
    },
    {
      validate: (value: string) => /[0-9]/.test(value),
      message: "숫자를 포함해야 합니다.",
    },
  ];

  const passwordConfirmRules = [
    {
      validate: (value: string) => value === password,
      message: "비밀번호가 일치하지 않습니다.",
    },
  ];

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <VerificationInput
            email={email}
            onEmailChange={setEmail}
            verificationCode={verificationCode}
            onVerificationChange={setVerificationCode}
          />
          <CheckInputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
            rules={passwordRules}
            validateMode="immediate"
            onValidation={setIsPasswordValid}
          />
          <CheckInputField
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            placeholder="비밀번호 확인"
            rules={passwordConfirmRules}
            validateMode="immediate"
            onValidation={setIsPasswordConfirmValid}
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
