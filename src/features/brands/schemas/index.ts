import * as yup from 'yup';

export const createBrandSchema = yup.object().shape({
  brandName: yup.string().required('Brand name is required'),
});
