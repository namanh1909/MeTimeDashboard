import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { ListPlus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

import { Button, Input, ErrorMessage } from '@/components/ui';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui';
import { createProductSchema } from '@/features/products/schemas';
import { useModalStore } from '@/hooks';

type ProductFormInputs = {
  name: string;
  sku: string;
  price: number;
  description: string;
};

const UpsertProductModal: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      name: '',
      sku: '',
      price: 0,
      description: '',
    },
  });
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const onSubmit = (_data: ProductFormInputs) => {
    reset();
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isDialogOpen) => (isDialogOpen ? open() : close())}
    >
      <DialogTrigger asChild>
        <Button onClick={() => open()}>
          <ListPlus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Product name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Product Name" />
              )}
            />
            {errors.name && (
              <ErrorMessage message={errors.name.message as string} />
            )}
            <Controller
              name="sku"
              control={control}
              rules={{ required: 'SKU is required' }}
              render={({ field }) => <Input {...field} placeholder="SKU" />}
            />
            {errors.sku && (
              <ErrorMessage message={errors.sku.message as string} />
            )}
            <Controller
              name="price"
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="Price" />
              )}
            />
            {errors.price && (
              <ErrorMessage message={errors.price.message as string} />
            )}
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Description" />
              )}
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message as string} />
            )}
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProductModal;
