import prisma from "../config/dbConfig";
import { ProductAttributes, ProductType } from "../domain/models/Product";
import { Optional } from "../utils/option";

export interface IProductRepository {
  getProductById(id: number): Promise<ProductAttributes | null>;
  getProductByName(name: string): Promise<ProductAttributes | null>;
  getProductsByType(type: ProductType): Promise<ProductAttributes[] | null>;
  getProductPrice(name: string): Promise<number | null>;
  getProducts(): Promise<ProductAttributes[] | null>;
  createProduct(
    body: Optional<ProductAttributes, "id">
  ): Promise<ProductAttributes | null>;
  updateProductById(
    id: number,
    body: Partial<ProductAttributes>
  ): Promise<ProductAttributes | null>;
  deleteProductById(id: number): void;
}

export const ProductRepository: IProductRepository = {
  getProductById: async (id: number) => {
    try {
      const product = await prisma.product.findFirst({ where: { id: id } });
      console.log(product);
      if (product) return product as ProductAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getProductByName: async (name: string) => {
    try {
      const product = await prisma.product.findFirst({ where: { name: name } });
      if (product) return product as ProductAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getProductsByType: async (type: ProductType) => {
    try {
      const product = await prisma.product.findMany({
        where: { productType: type },
      });
      if (product) return product as ProductAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getProductPrice: async (name: string) => {
    try {
      const product = await prisma.product.findFirst({ where: { name: name } });
      if (product && product.price) return product.price;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getProducts: async () => {
    try {
      const products = await prisma.product.findMany();
      if (products) return products as ProductAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  createProduct: async (body: Optional<ProductAttributes, "id">) => {
    try {
      const newProduct = await prisma.product.create({
        data: body,
      });
      if (newProduct) return newProduct as ProductAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  updateProductById: async (id: number, body: Partial<ProductAttributes>) => {
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: body,
      });
      if (updatedProduct) return updatedProduct as ProductAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  deleteProductById: async (id: number) => {
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
