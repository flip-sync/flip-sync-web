import { Room } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { groupApi } from "@/libs/apis/group";

export const useGroupList = () => {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await groupApi.getGroupList();
      console.log(response.data);
      return response.data.data.content;
    },
    staleTime: 1000 * 60,
  });

  return { rooms, isLoading, error };
};
