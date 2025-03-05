import { baseUrl } from "./index";
import { Room } from "@/type";
import { AxiosResponse } from "axios";

export const groupApi = {
  getGroupList: () => {
    return baseUrl.get<Room[]>("/group");
  },
};
