import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import authApi from '../services/auth.api';

export const useAuthQuery = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response: {
      data: {
        tokens: { access: { token: string }; refresh: { token: string } };
      };
    }) => {
      localStorage.setItem('token', response.data.tokens.access.token);
      localStorage.setItem('refreshToken', response.data.tokens.refresh.token);

      navigate('/');
      toast.success('Login successful');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem('refreshToken');
      return authApi.logout({ refreshToken: refreshToken as string });
    },
    onSuccess: () => {
      localStorage.clear();
      navigate('/');
      toast.success('Logout successful');
    },
  });

  return { loginMutation, logoutMutation };
};
