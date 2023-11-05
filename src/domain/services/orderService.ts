import { OrderRepository } from "../../repositories/orderRepository";
import { OrderAttributes } from "../models/Order";
import { OrderType } from "../models/Order";
import { OrderStatus } from "../models/Order";
import productService from "./productService";

const orderService = {
    createOrder: async (body: OrderAttributes, email: string | undefined) => {
        if (!email)
            throw new Error("Usuário não logado");

        const product = await productService.getProductByName(body.productName);

        if (!product)
            throw new Error("Produto não existente");

        if (body.amount)
            body.amount = Number(body.amount);

        if (body.fee)
            body.fee = Number(body.fee);

        await OrderRepository.createOrder(body, email);
        return ("Pedido criado com sucesso");
    },
};

export default orderService;