interface AlertModalProps {
  message: string;
  onClick: () => void;
}

export default function AlertModal({ message, onClick }: AlertModalProps) {
  return (
    <div className="space-y-4">
      <p>{message}</p>
      <button
        onClick={onClick}
        className="w-full py-2 bg-primary text-white rounded-lg"
      >
        확인
      </button>
    </div>
  );
}
