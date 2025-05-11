import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { Button, ErrorMessage } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui';
import { ImagePicker } from '@/components/ui';
import { InputForm } from '@/components/ui';
import { createProductSchema } from '@/features/products/schemas';
import { useModalStore } from '@/hooks';

interface ProductFormInputs {
  productName: string;
  productImageDetail: (File | null | undefined)[];
  descriptionProduct: string;
  price: number;
  brandId: string;
  thumbnail: string;
  size: string;
  type: string;
  quantity: string;
  status: string;
}

const UpsertProductModal: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      productName: '',
      productImageDetail: [],
      descriptionProduct: '',
      price: 0, // Change from '' to 0
      brandId: '',
      thumbnail: '',
      size: '',
      type: '',
      quantity: '',
      status: '',
    },
  });
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const onSubmit = (_data: ProductFormInputs) => {
    reset();
    close();
  };

  const onOpenChange = () => {
    if (isOpen) return close();
    open();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thumbnail
              </label>
              <ImagePicker control={control} name="thumbnail" />
            </div>

            {errors.thumbnail && (
              <ErrorMessage message={errors.thumbnail.message as string} />
            )}
            <div>
              <Controller
                name="productName"
                control={control}
                rules={{ required: 'Product name is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Product Name" />
                )}
              />
              {errors.productName && (
                <ErrorMessage message={errors.productName.message as string} />
              )}
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Price is required' }}
                render={({ field }) => (
                  <InputForm {...field} type="number" placeholder="Price" />
                )}
              />
              {errors.price && (
                <ErrorMessage message={errors.price.message as string} />
              )}
              <Controller
                name="descriptionProduct"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Description" />
                )}
              />
              {errors.descriptionProduct && (
                <ErrorMessage
                  message={errors.descriptionProduct.message as string}
                />
              )}
            </div>
            <div>
              <Controller
                name="type"
                control={control}
                rules={{ required: 'Type is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Type" />
                )}
              />
              {errors.type && (
                <ErrorMessage message={errors.type.message as string} />
              )}
              <Controller
                name="brandId"
                control={control}
                rules={{ required: 'Brand ID is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Brand ID" />
                )}
              />
              {errors.brandId && (
                <ErrorMessage message={errors.brandId.message as string} />
              )}
              <Controller
                name="size"
                control={control}
                rules={{ required: 'Size is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Size" />
                )}
              />
              {errors.size && (
                <ErrorMessage message={errors.size.message as string} />
              )}
              <Controller
                name="quantity"
                control={control}
                rules={{ required: 'Quantity is required' }}
                render={({ field }) => (
                  <InputForm {...field} type="number" placeholder="Quantity" />
                )}
              />
              {errors.quantity && (
                <ErrorMessage message={errors.quantity.message as string} />
              )}
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <InputForm {...field} placeholder="Status" />
                )}
              />
              {errors.status && (
                <ErrorMessage message={errors.status.message as string} />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProductModal;
