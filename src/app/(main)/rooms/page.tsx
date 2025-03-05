"use client";

import { Suspense } from "react";
import RoomHeader from "./components/RoomHeader";
import RoomListWrapper from "./components/RoomListWrapper";
import CreateCircleButton from "@/app/components/CreateCircleButton";
import { useModal } from "@/hooks/useModal";
import { useGroupList, useCreateRoom } from "@/hooks/group";

export default function Rooms() {
  const { openModal } = useModal();
  const { rooms, isLoading, error } = useGroupList();
  const { createRoom } = useCreateRoom();

  const handleCreateRoom = () => {
    openModal("createRoom", {
      onSubmit: (name: string) => {
        createRoom.mutate({ name });
      },
    });
  };

  return (
    <div className="space-y-4">
      <RoomHeader />
      <Suspense fallback={<div>Loading...</div>}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {rooms && <RoomListWrapper rooms={rooms} />}
      </Suspense>
      <CreateCircleButton onClick={handleCreateRoom} />
    </div>
  );
}
