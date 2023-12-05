export interface Product{
  id: number;
  productName: string;
  description: string;
  img: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt?: Date;
}