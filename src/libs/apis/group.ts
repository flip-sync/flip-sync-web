import { api } from ".";

export const groupApi = {
  getGroupList: () => {
    return api.get("/group");
  },
};
