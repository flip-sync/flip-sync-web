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
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await groupApi.getGroupList();
      return response.data;
    },
    initialData: initialRooms,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {rooms.map((room: Room) => (
        <div key={room.id} className="w-[369px] h-[290px]">
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
