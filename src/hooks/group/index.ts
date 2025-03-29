import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { groupApi } from "@/libs/apis/group";

export const useInfiniteGroupList = () => {
  return useInfiniteQuery({
    queryKey: ["rooms"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await groupApi.getGroupList(pageParam, 5);
      return response.data.data.content;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
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
