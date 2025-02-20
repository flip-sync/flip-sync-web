"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DropdownOption {
  key: string;
  value: string;
}

interface DropdownProps {
  options: Record<string, string>;
  defaultValue: string;
  onChange: (key: string) => void;
  icon?: {
    src: string;
    alt: string;
  };
}

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  icon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key: string) => {
    setSelected(key);
    setIsOpen(false);
    onChange(key);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <Image src={icon.src} alt={icon.alt} width={16} height={16} />}
        <span className="text-[15px] text-gray-400 font-semibold">
          {options[selected]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-7 z-10">
          {Object.entries(options).map(([key, value]) => (
            <button
              key={key}
              className={`w-full px-4 py-2 text-left hover:bg-gray-8 ${
                selected === key ? "text-primary" : "text-gray-1"
              }`}
              onClick={() => handleSelect(key)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
