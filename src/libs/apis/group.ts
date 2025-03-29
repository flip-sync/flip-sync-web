import { baseUrl } from "./index";
import { Room } from "../../type";

export const groupApi = {
  getGroupList: (page: number, size: number) => {
    return baseUrl.get<Room[]>(`/group?page=${page}&size=${size}`);
  },

  createRoom: (data: { name: string }) => {
    return baseUrl.post<Room>("/group", data);
  },
};
