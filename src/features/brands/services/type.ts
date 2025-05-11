export type Brand = {
  _id: string;
  brandName: string;
  brandImage: string;
  description: string;
};

export type BrandMutation = {
  brandName: string;
  brandImage: string;
  description: string;
};
