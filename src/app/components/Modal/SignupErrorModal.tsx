interface SignupErrorModalProps {
  onClick: () => void;
}

export default function SignupErrorModal({ onClick }: SignupErrorModalProps) {
  return (
    <div className="flex flex-col space-y-4 items-center pt-[40px] pb-[24px] px-[24px]">
      <div className="w-[322px] flex flex-col items-center">
        <p className="font-bold text-[24px] leading-[30px] mb-[8px]">
          회원가입 실패
        </p>
        <p className="text-[16px] leading-[24px] text-gray-4">
          다시 시도해 주세요.
        </p>
        <button
          onClick={onClick}
          className="w-full py-2 bg-primary text-white rounded-lg mt-[32px]"
        >
          확인
        </button>
      </div>
    </div>
  );
}
