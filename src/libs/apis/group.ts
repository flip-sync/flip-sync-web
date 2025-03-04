import { baseUrl } from "./index";
import { ApiResponse } from "@/type/api";
import { Room } from "@/type";

export const groupApi = {
  getGroupList: () => {
    return baseUrl.get<ApiResponse<Room[]>>("/group");
  },
};
