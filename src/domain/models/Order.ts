export type OrderType = "PURCHASE" | "WISH";
export type OrderStatus = "PENDING" | "PAID" | "COMPLETE";

export interface OrderAttributes {
  id: number;
  type: OrderType;
  status: OrderStatus | null;

  userEmail: string;

  productName: string;
  productPrice: number;

  amount: number;
  fee: number;
  createdAt: Date;
}