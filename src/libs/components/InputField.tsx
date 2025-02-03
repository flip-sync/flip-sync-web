import Image from "next/image";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isClearable?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
}

export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  isClearable = false,
  onBlur,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={type} className="text-gray-5 text-[12px] leading-[18px]">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-7 focus:border-gray-5 ${
            disabled ? "bg-gray-8 text-gray-6 cursor-not-allowed" : ""
          }`}
          onBlur={onBlur}
        />
        {value && isClearable && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/clear.svg"
              alt="clear"
              width={20}
              height={20}
              className="text-gray-5"
            />
          </button>
        )}
      </div>
    </div>
  );
}
