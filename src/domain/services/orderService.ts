import { OrderRepository } from "../../repositories/orderRepository";
import { OrderAttributes} from "../models/Order";
import { OrderType } from "../models/Order";
import { OrderStatus } from "../models/Order";

const orderService = {
    createOrder: async (body: OrderAttributes, email: string | undefined) => {
        if(!email)
            throw new Error("Usuário não logado");

    await OrderRepository.createOrder(body, email);
    return ("Pedido criado com sucesso");
    },
}

export default orderService;