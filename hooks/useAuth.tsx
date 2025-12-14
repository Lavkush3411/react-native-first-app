import { API_ROUTES } from "@/api/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../api/useAxios";

export const useAuth = () => {
  const { getData } = useAxios();   
  return useQuery({
    queryKey: ['profile'],
    queryFn:  async () => {
      const response = await getData(API_ROUTES.AUTH.ACTIVE_USER);
      return response as any;
    },

  })
}