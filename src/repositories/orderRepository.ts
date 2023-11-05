import prisma from "../config/dbConfig";
import { Optional } from "../utils/option";
import { OrderType } from "../domain/models/Order";
import { OrderStatus } from "../domain/models/Order";
import { OrderAttributes } from "../domain/models/Order";

import { ProductRepository } from "./productRepository";

export interface IOrderRepository {
    createOrder(body: Optional<OrderAttributes, "id">, email: string, product: string): Promise<OrderAttributes | null>;
}

export const OrderRepository: IOrderRepository = {
    createOrder: async (body: Optional<OrderAttributes, "id">, email: string, product: string) => {
        try {
            const price = await ProductRepository.getProductPrice(product);

            if (!price) {
                return null;
            }

            const newOrder = await prisma.order.create({
                data: {
                    type: body.type,
                    status: body.status,
                    userEmail: email,
                    productName: product,
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
    }
};