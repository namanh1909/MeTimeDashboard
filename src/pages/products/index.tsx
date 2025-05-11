import { ListPlus } from 'lucide-react';

import { columns } from './components/columns';
import DataTable from './components/data-table';
import UpsertProductModal from './components/upsertModal';
import { Button } from '@/components/ui';
import { useModalStore } from '@/hooks';

const Products = () => {
  const open = useModalStore((state) => state.open);

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                <Button onClick={() => open()}>
                  <ListPlus /> Add a new Product
                </Button>
                <UpsertProductModal />
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={[]} />
        </div>
      </div>
    </>
  );
};

export default Products;
