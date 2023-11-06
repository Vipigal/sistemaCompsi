import { OrderRepository } from "../../repositories/orderRepository";
import { OrderAttributes } from "../models/Order";
import productService from "./productService";

const orderService = {
  createOrder: async (body: OrderAttributes, email: string | undefined) => {
    if (!email) throw new Error("Usuário não logado");

    const product = await productService.getProductByName(body.productName);

    if (!product) throw new Error("Produto não existente");

    if (body.amount) body.amount = Number(body.amount);

    if (body.fee) body.fee = Number(body.fee);

    await OrderRepository.createOrder(body, email);
    return "Pedido criado com sucesso";
  },

  listOrders: async (limit: number, page: number) => {
    const orders = await OrderRepository.listOrders();
    if (orders) return orders;
    else throw new Error("Não há pedidos cadastrados");
  },
  
  async updateOrderbyId(id: number, body: Partial<OrderAttributes>) {
    const product = await OrderRepository.updateOrderByID(id, body);
    if (product) return "Produto editado por ID";
    else throw new Error("Erro ao editar produto");
  },

  async listOrdersByProduct(productName: string): Promise<OrderAttributes[] | null>{
    if(!await productService.getProductByName(productName))
    throw new Error("Produto Não encontrado")
    const orders = await OrderRepository.listOrdersByProduct(productName); 
    return orders; 
  },

};



export default orderService;

/*

listOrdersByUser(email: string): Promise<OrderAttributes[] | null>;
getOrderByID(id: number): Promise<OrderAttributes | null>;
deleteOrderByID(id: number): void;

*/