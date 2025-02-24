import { serverGroupApi } from "@/libs/apis/server/group";
import { Suspense } from "react";
import RoomHeader from "./components/RoomHeader";
import RoomListWrapper from "./components/RoomListWrapper";

export default async function Rooms() {
  const initialRooms = await serverGroupApi.getGroupList();

  return (
    <div className="space-y-4">
      <RoomHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <RoomListWrapper initialRooms={initialRooms.data} />
      </Suspense>
    </div>
  );
}
