export type CreateProductDto = {
  title: string;
  content: string;
  price: string;
  location: string;
  imgSrc?: string;
};

export type UpdateProductDto = {
  title: string;
  content: string;
  price: string;
  location: string;
  imgSrc?: string;
};
