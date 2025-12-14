import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { API_ROUTES } from "../api/apiRoutes";
import useAxios from "../api/useAxios";

const useLogout = () => {
  const { postData } = useAxios(); // assuming postData is defined like: (url, body?) => Promise
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => postData(API_ROUTES.AUTH.SIGNOUT),
    onSuccess: () => {
      queryClient.clear(); // Clear all queries to reset the state
      router.replace('/(auth)/login');
    },
    onError: () => {
      console.log("Logout failed. Please try again.");
    },
  });
};

export default useLogout;