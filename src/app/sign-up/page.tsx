"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VerificationInput from "../components/VerificationInput";
import CheckInputField from "../components/CheckInputField";
import InputField from "../components/InputField";
import SocialLogin from "../components/SocialLogin";
import { userApi } from "@/libs/apis/user";
import { useModal } from "@/hooks/useModal";
import { confirmPasswordRules, passwordRules } from "@/libs/static";

export default function SignupPage() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);

  const isFormValid =
    email &&
    verificationCode &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    name;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await userApi.signUp({
        email,
        password,
        name,
        passwordConfirm,
      });

      const handleSignupComplete = () => {
        closeModal();
        router.push("/login");
      };

      const handleSignupError = () => {
        closeModal();
      };

      if (response.status === 201) {
        openModal("signupComplete", { onClick: handleSignupComplete });
      } else {
        openModal("signupError", { onClick: handleSignupError });
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      openModal("signupError", { onClick: closeModal });
    }
  };

  const handleRequestVerification = async (email: string) => {
    try {
      await userApi.verifyEmail(email);
    } catch (error) {
      console.error("인증 요청 실패:", error);
    }
  };

  const handleVerifyCode = async (email: string, code: string) => {
    try {
      const response = await userApi.verifyEmailCheck(email, code);
      return response.status === 204;
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
      return false;
    }
  };

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
            onRequestVerification={handleRequestVerification}
            onVerifyCode={handleVerifyCode}
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
            rules={confirmPasswordRules(password)}
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
