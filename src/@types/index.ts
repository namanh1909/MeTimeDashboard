/* eslint-disable @typescript-eslint/no-unused-vars */
type ApiResponse<T> = {
  success: boolean;
  data: T;
  status: number;
  statusText: string;
};
type ApiMessageResponse = {
  success: boolean;
  message: string;
  status: number;
  statusText: string;
};

type Product = {
  id: string;
  thumbnail: string;
  name: string;
  type: string;
  sku: string;
  qty: number;
  status: string;
  description: string;
  price: number;
};
