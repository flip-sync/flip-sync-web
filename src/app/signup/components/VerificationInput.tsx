import { useState, useEffect } from "react";
import InputField from "../../components/InputField";

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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleRequest = () => {
    setIsRequested(true);
    setTimeLeft(300);
    // TODO: 인증 요청 API 호출
  };

  const handleResend = () => {
    setTimeLeft(300);
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
        <div className="relative">
          <InputField
            label="인증번호"
            type="text"
            value={verificationCode}
            onChange={onVerificationChange}
            placeholder="인증번호 6자리 입력"
          />
          <div className="absolute right-16 top-[37.5px] text-sm text-primary">
            {`${minutes}:${seconds.toString().padStart(2, "0")}`}
          </div>
          <button
            type="button"
            onClick={handleResend}
            className={`absolute right-3 top-[34px] bg-gray-8 text-[12px] leading-[18px] px-2 py-1 rounded-[4px] text-gray-4 hover:text-primary-dark
          `}
          >
            재전송
          </button>
        </div>
      )}
    </div>
  );
}
