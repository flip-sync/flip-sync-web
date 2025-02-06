"use client";

import { useState, useCallback } from "react";
import CheckInputField from "../components/CheckInputField";
import { useModal } from "@/hooks/useModal";

export default function ForgotPassword() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const { openModal } = useModal();

  const emailRules = [
    {
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "올바른 이메일 형식이 아닙니다.",
    },
  ];

  const verificationCodeRules = [
    {
      validate: (value: string) => value.length === 6,
      message: "인증번호는 6자리여야 합니다.",
    },
  ];

  const passwordRules = [
    {
      validate: (value: string) => value.length >= 8,
      message: "비밀번호는 8자 이상이어야 합니다.",
    },
    {
      validate: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(value),
      message: "영문, 숫자, 특수문자를 포함해야 합니다.",
    },
  ];

  const confirmPasswordRules = [
    {
      validate: (value: string) => value === password,
      message: "비밀번호가 일치하지 않습니다.",
    },
  ];

  const handleEmailSubmit = useCallback(() => {
    if (isEmailValid) {
      // TODO: 이메일 인증 요청 API 호출
      setStep(2);
    }
  }, [isEmailValid]);

  const handleVerificationSubmit = useCallback(() => {
    if (isCodeValid) {
      // TODO: 인증번호 확인 API 호출
      setStep(3);
    }
  }, [isCodeValid]);

  const handlePasswordSubmit = useCallback(() => {
    // TODO: 비밀번호 변경 API 호출
    openModal("alert", { message: "비밀번호가 변경되었습니다." });
  }, [openModal]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-8">비밀번호 찾기</h1>

      {step === 1 && (
        <div className="space-y-4">
          <CheckInputField
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="이메일을 입력해주세요"
            rules={emailRules}
            validateMode="immediate"
            onValidation={setIsEmailValid}
          />
          <button
            onClick={handleEmailSubmit}
            disabled={!isEmailValid}
            className={`w-full py-2 rounded-lg ${
              isEmailValid
                ? "bg-primary text-white "
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            인증번호 받기
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <CheckInputField
            label="인증번호"
            type="text"
            value={verificationCode}
            onChange={setVerificationCode}
            placeholder="인증번호 6자리를 입력해주세요"
            rules={verificationCodeRules}
            validateMode="immediate"
            onValidation={setIsCodeValid}
          />
          <button
            onClick={handleVerificationSubmit}
            disabled={!isCodeValid}
            className={`w-full py-2 rounded-lg ${
              isCodeValid
                ? "bg-primary text-white "
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            인증번호 확인
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <CheckInputField
            label="새 비밀번호"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="새 비밀번호를 입력해주세요"
            rules={passwordRules}
            validateMode="immediate"
          />
          <CheckInputField
            label="새 비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="새 비밀번호를 다시 입력해주세요"
            rules={confirmPasswordRules}
            validateMode="immediate"
          />
          <button
            onClick={handlePasswordSubmit}
            className="w-full py-2 rounded-lg bg-primary text-white "
          >
            비밀번호 변경하기
          </button>
        </div>
      )}
    </div>
  );
}
