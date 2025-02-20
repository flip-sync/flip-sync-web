"use client";

import Dropdown from "@/app/components/Dropdown";
import InputField from "@/app/components/AuthInputField";

const SORT_OPTIONS = {
  latest: "최신순",
  oldest: "오래된순",
  name: "이름순",
} as const;

export default function Rooms() {
  const handleSort = (key: string) => {
    // TODO: 정렬 로직 구현
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] font-semibold">악보 공유방</h1>
        <Dropdown
          options={SORT_OPTIONS}
          defaultValue="latest"
          onChange={handleSort}
          icon={{
            src: "/arrow-left-right.svg",
            alt: "arrow-left-right",
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="공유방 검색"
          className="w-full h-[48px] px-4 py-2 rounded-lg border border-gray-7 focus:outline-none"
        />
        <div className="my-[24px]">
          <button className="w-[112px] h-[48px] bg-primary text-white px-4 py-2 rounded-lg">
            검색
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-[48px] h-[48px] bg-gray-7 rounded-lg"></div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[16px] font-semibold">공유방 이름</h2>
            <p className="text-[14px] text-gray-400">
              참여자 10명, 최근 업데이트 2024.01.01
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
