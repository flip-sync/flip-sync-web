import { baseUrl } from "./index";

export const groupApi = {
  getGroupList: () => {
    return baseUrl.get("/group");
  },
};
