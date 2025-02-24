import { cookies } from "next/headers";

export const serverGroupApi = {
  getGroupList: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/group`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    return response.json();
  },
};
