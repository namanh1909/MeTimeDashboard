import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  productImageDetail: yup.array().of(yup.mixed<File>().nullable()).required(),
  descriptionProduct: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  brandId: yup.string().required('Brand ID is required'),
  thumbnail: yup.string().required('Thumbnail is required'),
  size: yup.string().required('Size is required'),
  type: yup.string().required('Type is required'),
  quantity: yup.string().required('Quantity is required'),
  status: yup.string().required('Status is required'),
});

export type ProductFormInputs = {
  productName: string;
  productImageDetail: (File | null | undefined)[];
  descriptionProduct: string;
  price: number;
  brandId: string;
  thumbnail: string;
  size: string;
  type: string;
  quantity: number;
  status: 'active' | 'inactive';
};
