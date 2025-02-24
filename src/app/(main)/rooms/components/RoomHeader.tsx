"use client";

import { useState } from "react";
import Dropdown from "@/app/components/Dropdown";
import SearchBar from "@/app/components/SearchBar";

type SortType = "latest" | "oldest" | "name";

const SORT_OPTIONS = {
  latest: "최신순",
  oldest: "오래된순",
  name: "이름순",
} as const;

export default function RoomHeader() {
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState<SortType>("latest");

  const handleSearch = () => {
    // TODO: 검색 로직 구현
    console.log("Search:", searchValue);
  };

  const handleSort = (type: string) => {
    setSortType(type as SortType);
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
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        placeholder="공유방 검색"
      />
    </div>
  );
}
