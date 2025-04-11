"use client";

import { useModal } from "@/hooks/useModalStore";
import { Avatar, AvatarFallback } from "../ui/avatar";

function OrderRightSide() {
  const { data } = useModal();
  const { order, dict } = data;

  const total =
    (order?.products.reduce(
      (acc, product) =>
        acc + parseInt(product?.price || "0") * parseInt(product.quantity),
      0
    ) || 0) + parseInt(order?.shippingFee || "0");

  return (
    <div className="border-l h-full p-5 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-5">
        <Avatar className="w-40 h-40">
          <AvatarFallback className="bg-brand/10 cursor-pointer text-4xl">
            {order?.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className=" flex flex-col items-center">
          <h1 className="text-primary-dark font-medium">{order?.user.name}</h1>
          <h3 className="text-[#929AA8]">{order?.user.email}</h3>
          <h3 className="text-[#929AA8]">+196585413526</h3>
        </div>
      </div>
      <div className="space-y-6 w-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[#434A57]">{dict?.orders.productsPrice}</h1>
            <h3 className="text-[#929AA8]">
              {order?.status === "REQUESTED" ? "-" : total} €
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[#434A57]">{dict?.orders.serviceFee}</h1>
            <h3 className="text-[#929AA8]">
              {order?.status === "REQUESTED" ? "-" : total * 0.1} €
            </h3>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-primary-dark">Total</h1>
            <h3 className="text-2xl font-medium text-brand">
              {order?.status === "REQUESTED" ? "-" : total + total * 0.1} €
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderRightSide;
