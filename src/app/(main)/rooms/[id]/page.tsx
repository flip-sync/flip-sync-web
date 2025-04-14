"use client";
//채팅방 ui

import { useParams } from "next/navigation";

export default function Room() {
  const { id } = useParams();

  return <div>Room {id}</div>;
}
