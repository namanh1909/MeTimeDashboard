import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import brandApis from '../services/brands.api';
import { Brand } from '../services/type';
import { QueryOptions } from '@/ts/types';

const brands = createQueryKeys('brands', {
  list: () => ({
    queryKey: ['brands'],
    queryFn: () => brandApis.get(),
  }),
});

export const useBrandsListQuery = (
  options: QueryOptions<ApiResponse<Brand[]>> = {},
) => {
  return useQuery({
    ...brands.list(),
    ...options,
  });
};

export const useAddBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandApis.create,
    onSuccess: () => {
      void toast.success('Create new Brand successfully');
      void queryClient.invalidateQueries(brands.list().queryKey);
    },
    onError: () => {
      void toast.error('Create new Brand failed');
    },
  });
};

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: FormData }) =>
      brandApis.update(id, params),
    onSuccess: () => {
      void toast.success('Update Brand successfully');
      void queryClient.invalidateQueries(brands.list().queryKey);
    },
    onError: () => {
      void toast.error('Update Brand failed');
    },
  });
};
