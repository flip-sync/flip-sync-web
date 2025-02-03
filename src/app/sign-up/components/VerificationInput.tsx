import InputField from "@/libs/components/InputField";
import { useState, useEffect } from "react";

interface VerificationInputProps {
  email: string;
  onEmailChange: (value: string) => void;
  verificationCode: string;
  onVerificationChange: (value: string) => void;
}

export default function VerificationInput({
  email,
  onEmailChange,
  verificationCode,
  onVerificationChange,
}: VerificationInputProps) {
  const [isRequested, setIsRequested] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [verificationStatus, setVerificationStatus] = useState<
    "" | "success" | "error"
  >("");

  useEffect(() => {
    if (!isRequested) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRequested]);

  useEffect(() => {
    if (verificationCode.length === 6) {
      // TODO: 실제 API 호출로 변경
      const isValid = verificationCode === "123456"; // 임시 검증 로직
      setVerificationStatus(isValid ? "success" : "error");
    } else {
      setVerificationStatus("");
    }
  }, [verificationCode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleRequest = () => {
    setIsRequested(true);
    setTimeLeft(300);
    // TODO: 인증 요청 API 호출
  };

  const handleResend = () => {
    setTimeLeft(300);
    setVerificationStatus("");
    onVerificationChange("");
    // TODO: 재인증 요청 API 호출
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <InputField
          label="이메일"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          disabled={isRequested}
        />
        <button
          type="button"
          onClick={handleRequest}
          disabled={isRequested}
          className={`absolute right-3 top-[34px] bg-gray-8 text-[12px] leading-[18px] px-2 py-1 rounded-[4px] ${
            isRequested
              ? "text-gray-6 cursor-not-allowed"
              : "text-gray-4 hover:text-primary-dark"
          }`}
        >
          인증요청
        </button>
      </div>

      {isRequested && (
        <div>
          <div className="relative">
            <InputField
              label="인증번호"
              type="text"
              value={verificationCode}
              onChange={(value) => {
                const numericValue = value.replace(/[^0-9]/g, "");
                if (numericValue.length <= 6) {
                  onVerificationChange(numericValue);
                }
              }}
              placeholder="인증번호 6자리 입력"
              disabled={verificationStatus === "success"}
            />
            {verificationStatus !== "success" && (
              <div className="flex items-center gap-2 absolute right-3 top-[35.5px] text-sm">
                <span className="text-primary">
                  {`${minutes}:${seconds.toString().padStart(2, "0")}`}
                </span>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-gray-4 bg-gray-8 text-[12px] leading-[18px] px-2 py-1 rounded-[4px]"
                >
                  재전송
                </button>
              </div>
            )}
          </div>
          {verificationStatus && (
            <p
              className={`mt-1 text-[12px] ${
                verificationStatus === "success"
                  ? "text-primary"
                  : "text-red-500"
              }`}
            >
              {verificationStatus === "success"
                ? "인증번호가 일치합니다."
                : "인증번호가 일치하지 않습니다."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
