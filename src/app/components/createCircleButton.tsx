interface CreateCircleButtonProps {
  onClick: () => void;
}

export default function CreateCircleButton({
  onClick,
}: CreateCircleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-16 right-16 w-14 h-14 bg-primary hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
}
