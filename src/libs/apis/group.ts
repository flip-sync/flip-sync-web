import { baseUrl } from "./index";
import { Room } from "@/type";

export const groupApi = {
  getGroupList: () => {
    return baseUrl.get<Room[]>("/group");
  },
  createRoom: (data: { name: string }) => {
    return baseUrl.post<Room>("/group", data);
  },
};
