"use client";

import Dropdown from "@/app/components/Dropdown";

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
    </div>
  );
}
