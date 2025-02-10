import { useModal } from "@/hooks/useModal";

interface AlertModalProps {
  message: string;
  onClick: () => void;
}

export default function AlertModal({ message, onClick }: AlertModalProps) {
  const { closeModal } = useModal();
  return (
    <div className="space-y-4 flex flex-col items-center justify-center px-[24px] py-[40px]">
      <p className="text-[16px] leading-[24px] font-bold ">{message}</p>
      <button
        onClick={() => {
          onClick && onClick();
          closeModal();
        }}
        className="w-full py-2 bg-primary text-white rounded-lg"
      >
        확인
      </button>
    </div>
  );
}
