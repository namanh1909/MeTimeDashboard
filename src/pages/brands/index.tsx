import { FC } from 'react';

import { ListPlus } from 'lucide-react';

import { columns } from './components/columns';
import DataTable from './components/data-table';
import UpsertProductModal from './components/upsert-modal';
import { Button } from '@/components/ui';
import { Spinner } from '@/components/ui';
import { useBrandsListQuery } from '@/features/brands/hooks/use-brand-query';
import { useModalStore } from '@/hooks';

const Brands: FC = () => {
  const { data: brands, isLoading: loadingFetch } = useBrandsListQuery();
  const open = useModalStore((state) => state.open);

  return (
    <Spinner loading={loadingFetch}>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
            <div className="flex items-center">
              <Button onClick={() => open()}>
                <ListPlus /> Add New Brand
              </Button>
              <UpsertProductModal />
            </div>
          </div>
          <DataTable columns={columns} data={brands?.data || []} />
        </div>
      </div>
    </Spinner>
  );
};

export default Brands;
