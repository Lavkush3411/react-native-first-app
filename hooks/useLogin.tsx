import { API_ROUTES } from '@/api/apiRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import useAxios from '../api/useAxios';

const useLogin = () => {
  const { postData } = useAxios();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn:  (data: {email: string, password: string, organizationId: string}) => {
      return postData(API_ROUTES.AUTH.LOGIN, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.replace('/(tabs)/profile');
    },
  })
}

export default useLogin