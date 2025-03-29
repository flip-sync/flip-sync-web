"use client";

import { Room } from "../../../../type";
import { useRouter } from "next/navigation";

interface RoomListWrapperProps {
  rooms: Room[];
}

export default function RoomListWrapper({ rooms }: RoomListWrapperProps) {
  const router = useRouter();

  const handleRoomClick = (id: number) => {
    router.push(`/rooms/${id}`);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {rooms.map((room: Room) => (
        <div
          key={room.id}
          className="w-[369px] h-[290px] cursor-pointer"
          onClick={() => handleRoomClick(room.id)}
        >
          <div className="flex flex-col gap-2">
            <div className="w-[369px] h-[200px] bg-gray-7 rounded-lg"></div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-semibold">{room.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
