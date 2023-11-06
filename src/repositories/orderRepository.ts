import prisma from "../config/dbConfig";
import { OrderAttributes } from "../domain/models/Order";
import { Optional } from "../utils/option";

import { ProductRepository } from "./productRepository";

export interface IOrderRepository {
  createOrder(body: Optional<OrderAttributes, "id">, email: string): Promise<OrderAttributes | null>;
  updateOrderByID(id: number, body: Partial<OrderAttributes>): Promise<OrderAttributes | null>;
  listOrders(): Promise<OrderAttributes[] | null>;
  listOrdersByProduct(productName: string): Promise<OrderAttributes[] | null>;
  listOrdersByUser(email: string): Promise<OrderAttributes[] | null>;
  getOrderByID(id: number): Promise<OrderAttributes | null>;
  deleteOrderByID(id: number): void;
}


export const OrderRepository: IOrderRepository = {
  createOrder: async (body: Optional<OrderAttributes, "id">, email: string) => {
    try {
      const price = await ProductRepository.getProductPrice(body.productName);

      if (!price) return null;

      const newOrder = await prisma.order.create({
        data: {
          type: body.type,
          status: body.status,
          userEmail: email,
          productName: body.productName,
          productPrice: price,
          amount: body.amount,
          fee: body.fee,
        },
      });
      if (newOrder) return newOrder as OrderAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  updateOrderByID: async (id: number, body: Partial<OrderAttributes>) => {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: id },
        data: body,
      });
      if (updatedOrder) return updatedOrder as OrderAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  listOrders: async () => {
    try {
      const orders = await prisma.order.findMany();
      if (orders) return orders as OrderAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  listOrdersByProduct: async (productName: string) => {
    try {
      const orders = await prisma.order.findMany({
        where: { productName: productName }
      });
      if (orders) return orders as OrderAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  listOrdersByUser: async (email: string) => {
    try {
      const orders = await prisma.order.findMany({
        where: { userEmail: email }
      });
      if (orders) return orders as OrderAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  getOrderByID: async (id: number) => {
    try {
      const order = await prisma.order.findFirst({
        where: { id: id }
      });
      if (order) return order as OrderAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  deleteOrderByID: async (id: number) => {
    try {
      await prisma.order.delete({
        where: {id: id}
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  }
};
