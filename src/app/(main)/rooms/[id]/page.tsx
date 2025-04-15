"use client";
//채팅방 ui

import { useSearchParams } from "next/navigation";

export default function Room() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  return <div>Room {id}</div>;
}
