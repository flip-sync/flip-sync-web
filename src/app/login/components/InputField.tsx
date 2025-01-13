import Image from "next/image";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
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
          className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-7 focus:border-gray-5"
        />
        {value && (
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
