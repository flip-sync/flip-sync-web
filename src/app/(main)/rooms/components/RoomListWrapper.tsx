"use client";

import { useQuery } from "@tanstack/react-query";
import { Room } from "@/type";
import { groupApi } from "@/libs/apis/group";

interface RoomListWrapperProps {
  initialRooms: Room[];
}

export default function RoomListWrapper({
  initialRooms,
}: RoomListWrapperProps) {
  const { data: rooms } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await groupApi.getGroupList();
      return response.data;
    },
    initialData: initialRooms,
    staleTime: 1000 * 60,
  });

  if (rooms.length < 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-[16px] text-gray-400">악보 공유방이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {rooms.map((room: Room) => (
        <div key={room.id}>
          <div className="flex items-center gap-2">
            <div className="w-[48px] h-[48px] bg-gray-7 rounded-lg"></div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-semibold">{room.name}</h2>
              <p className="text-[14px] text-gray-400">
                참여자 10명, 최근 업데이트 2024.01.01
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
