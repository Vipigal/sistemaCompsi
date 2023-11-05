import { OrderRepository } from "../../repositories/orderRepository";
import { OrderAttributes} from "../models/Order";
import { OrderType } from "../models/Order";
import { OrderStatus } from "../models/Order";

const orderService = {
    createOrder: async (body: OrderAttributes, email: string | undefined, product: string | undefined) => {
        if(!email)
            throw new Error("Usuário não logado");

        if(!product)
            throw new Error("Produto inválido");

    await OrderRepository.createOrder(body, email, product);
    return ("Pedido criado");
    },
}
