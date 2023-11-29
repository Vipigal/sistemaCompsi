import { OrderRepository } from "../orderRepository";

test(`teste listar pedidos`, async () => {
  const orders = await OrderRepository.listOrders();
  expect(orders).not.toBe(null);
});
