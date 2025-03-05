"use client";

import { Suspense, useEffect, useState } from "react";
import RoomHeader from "./components/RoomHeader";
import RoomListWrapper from "./components/RoomListWrapper";
import CreateCircleButton from "@/app/components/CreateCircleButton";
import { useModal } from "@/hooks/useModal";
import { useGroupList } from "@/hooks/group";
export default function Rooms() {
  const { openModal } = useModal();
  const { rooms, isLoading } = useGroupList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <RoomHeader />
      <Suspense fallback={<div>Loading...</div>}>
        {rooms && <RoomListWrapper rooms={rooms} />}
      </Suspense>
      <CreateCircleButton onClick={() => openModal("createRoom")} />
    </div>
  );
}
