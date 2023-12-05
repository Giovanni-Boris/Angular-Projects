export interface Order {
  id: number;
  productName: string;
  img: string;
  customer: string;
  date: Date;
  amount: number;
  method: string;
  status: string;
}
