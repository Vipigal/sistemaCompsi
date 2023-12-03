import prisma from "../../config/dbConfig";
import { OrderRepository } from "../orderRepository";
import { UserRepository } from "../userRepository";

test(`teste listar pedidos`, async () => {
  const orders = await OrderRepository.listOrders();
  expect(orders).not.toBe(null);
});

test(`teste createOrder`, async () => {
  const original_order_price = 0;
  const order = await OrderRepository.createOrder(
    {
      amount: 1,
      fee: 0,
      productName: `mock_product`,
      productPrice: original_order_price,
      status: "COMPLETE",
      type: "PURCHASE",
      userEmail: `mock_email@email.com`,
    },
    "mock_creator_email@email.com"
  );

  const new_order_price = 200;
  prisma.order.create = jest.fn().mockImplementation(() => ({
    data: {
      amount: 1,
      fee: 0,
      productName: `mock_product`,
      productPrice: new_order_price,
      status: "COMPLETE",
      type: "PURCHASE",
      userEmail: `mock_email@email.com`,
    },
  }));

  expect(order).not.toBe(null);
  expect(original_order_price).not.toBe(new_order_price);
});

test(`teste listar usuarios`, async () => {
  const users = await UserRepository.getUsers();
  console.log(users);

  expect(users).not.toBe(null);
});
