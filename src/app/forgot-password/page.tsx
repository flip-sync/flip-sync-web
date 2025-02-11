"use client";

import { useState, useCallback } from "react";
import CheckInputField from "../components/CheckInputField";
import { useModal } from "@/hooks/useModal";
import { userApi } from "@/libs/apis/user";
import {
  confirmPasswordRules,
  emailRules,
  passwordRules,
  verificationCodeRules,
} from "../../libs/static";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const { openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = useCallback(async () => {
    setIsLoading(true);
    if (isEmailValid) {
      try {
        const response = await userApi.verifyEmail(email);
        if (response.code === "200_0") {
          setStep(2);
        } else {
          openModal("alert", { message: response.message });
        }
      } catch (error) {
        console.error("이메일 인증 요청 에러:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isEmailValid, email, openModal]);

  const handleVerificationSubmit = useCallback(async () => {
    if (isCodeValid) {
      try {
        const response = await userApi.verifyEmailCheck(
          email,
          verificationCode
        );
        if (response.code === "200_0") {
          openModal("alert", {
            message: "인증번호가 확인되었습니다.",
            onClick: () => {
              setStep(3);
            },
          });
        } else {
          openModal("alert", { message: response.message });
        }
      } catch (error) {
        console.error("인증번호 확인 실패:", error);
      }
    }
  }, [isCodeValid]);

  const handlePasswordSubmit = useCallback(async () => {
    if (isPasswordValid && isConfirmPasswordValid) {
      try {
        const response = await userApi.resetPassword({
          email,
          password,
          passwordConfirm: confirmPassword,
        });
        if (response.code === "200_0") {
          openModal("alert", {
            message: "비밀번호가 변경되었습니다.",
            onClick: () => {
              router.push("/login");
            },
          });
        } else {
          openModal("alert", { message: response.message });
        }
      } catch (error) {
        console.error("비밀번호 변경 실패:", error);
      }
    }
  }, [isPasswordValid, isConfirmPasswordValid]);

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
            disabled={!isEmailValid || isLoading}
            className={`w-full py-2 rounded-lg ${
              isEmailValid && !isLoading
                ? "bg-primary text-white "
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "요청중입니다..." : "인증번호 받기"}
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
            onValidation={setIsPasswordValid}
          />
          <CheckInputField
            label="새 비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="새 비밀번호를 다시 입력해주세요"
            rules={confirmPasswordRules(password)}
            validateMode="immediate"
            onValidation={setIsConfirmPasswordValid}
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
