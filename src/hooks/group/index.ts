import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupApi } from "@/libs/apis/group";

export const useGroupList = () => {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await groupApi.getGroupList();
      return response.data.data.content;
    },
  });

  return { rooms, isLoading, error };
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const createRoom = useMutation({
    mutationFn: (data: { name: string }) => groupApi.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  return { createRoom };
};
