export interface Product{
  Id: number;
  ProductName: string;
  Description: string;
  Img: string;
  Price: number;
  StockQuantity: number;
  CreatedAt: Date;
  UpdatedAt?: Date;
}