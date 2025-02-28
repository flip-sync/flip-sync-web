"use client";

import { Suspense, useEffect, useState } from "react";
import RoomHeader from "./components/RoomHeader";
import RoomListWrapper from "./components/RoomListWrapper";
import CreateCircleButton from "@/app/components/CreateCircleButton";
import { useModal } from "@/hooks/useModal";
import { groupApi } from "@/libs/apis/group";
import { Room } from "@/type";

export default function Rooms() {
  const { openModal } = useModal();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await groupApi.getGroupList();
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  return (
    <div className="space-y-4">
      <RoomHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <RoomListWrapper initialRooms={rooms} />
      </Suspense>
      <CreateCircleButton onClick={() => openModal("createRoom")} />
    </div>
  );
}
