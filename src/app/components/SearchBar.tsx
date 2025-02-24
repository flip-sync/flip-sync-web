"use client";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  buttonText?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "검색",
  value,
  onChange,
  onSearch,
  buttonText = "검색",
  className = "",
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-[48px] px-4 py-2 rounded-lg border border-gray-7 focus:outline-none focus:border-primary"
      />
      <div className="my-[24px]">
        <button
          onClick={onSearch}
          className="w-[112px] h-[48px] bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
