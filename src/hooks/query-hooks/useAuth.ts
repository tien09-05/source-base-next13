import axiosClient from '@configs/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { API_ROUTES } from '@utils/constants/routes.constant';

interface LoginPayload {
  username: string;
  password: string;
}
export const useLogin = () => {
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const url = API_ROUTES.LOGIN;
      const resp = await axiosClient.post(url, data);
      return resp;
    },
    onSuccess: () => {
      notification.success({
        message: 'Success!',
      });
    },
  });
};
