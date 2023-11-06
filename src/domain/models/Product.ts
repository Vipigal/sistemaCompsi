export type ProductType = "PRODUCT" | "EVENT";

export interface ProductAttributes {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  productType: ProductType;
  amount: number;
}
