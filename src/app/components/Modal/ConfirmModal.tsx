interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className="space-y-4">
      <p>{message}</p>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 bg-gray-6 text-white rounded-lg"
        >
          취소
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="flex-1 py-2 bg-primary text-white rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
}
