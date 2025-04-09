import {
  Company,
  Order,
  OrderHistory,
  Product,
  Subscription,
  User,
} from "@prisma/client";

export type OrderWithProducts = Order & {
  products: (Product & {
    company: Company;
  })[];
  user: User;
  orderHistory: OrderHistory[];
};

export type UserWithOrders = User & {
  orders: (Order & {
    products: (Product & {
      company: Company;
    })[];
  })[];
  subscription: Subscription | null;
};
