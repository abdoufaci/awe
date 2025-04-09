"use client";

import { useModal } from "@/hooks/useModalStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

function ClientDetailsBody() {
  const { data } = useModal();

  const { client: user, dict } = data;

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <Avatar className="h-40 w-40 shadow-md">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-brand/10 cursor-pointer">
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="-space-y-1">
          <h3 className="text-[#929AA8] text-sm">5564051</h3>
          <div className="flex items-center gap-5">
            <h1 className="text-primary-dark font-medium text-lg">
              {user?.name}
            </h1>
            <Button
              variant={!!user?.subscription ? "subscribed" : "notSubscribed"}
              className="rounded-full py-1 px-7 h-fit ">
              {!!user?.subscription
                ? dict?.users.subscribed
                : dict?.users.notSubscribed}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand" />
            <h1 className="text-sm text-[#576070]">
              {format(user?.createdAt || new Date(), "dd/MM/yyyy")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-brand" />
            <h1 className="text-sm text-[#576070]">{user?.email}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand" />
            <h1 className="text-sm text-[#576070]">+213 541 85 26 85</h1>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand" />
            <h1 className="text-sm text-[#576070]">Paris , France</h1>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <h1 className="text-xl text-primary-dark font-medium">
          Orders <span className="text-[#434A57]">({user?.orders.length})</span>
        </h1>
        {user?.orders.map((order) => {
          const total =
            (order?.products.reduce(
              (acc, product) => acc + parseInt(product?.price || "0"),
              0
            ) || 0) + parseInt(order?.shippingFee || "0");
          return (
            <div className="w-full rounded-xl border border-[#CBCFD7] p-5 pr-10 space-y-2">
              <Button
                //@ts-ignore
                variant={order?.status}
                className="text-xs h-fit">
                {
                  dict?.orders[
                    //@ts-ignore
                    order?.status
                  ]
                }
              </Button>
              <div className="grid grid-cols-1 md:!grid-cols-[40%_60%] gap-7">
                <div className="space-y-7">
                  <div className="space-y-1">
                    <h1 className="text-[#151515] text-2xl font-semibold">
                      {order?.orderId}
                    </h1>
                    <h1 className="text-[#929AA8]">
                      {format(order?.createdAt || new Date(), "dd/MM/yyyy")}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand" />
                    <h1 className="text-[#576070] font-medium">
                      {order?.shippingAdress}
                    </h1>
                  </div>
                  <div className="space-y-6 w-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h1 className="text-[#434A57]">
                          {dict?.orders.productsPrice}
                        </h1>
                        <h3 className="text-[#929AA8]">
                          {order?.status === "REQUESTED" ? "-" : total} €
                        </h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-[#434A57]">
                          {dict?.orders.serviceFee}
                        </h1>
                        <h3 className="text-[#929AA8]">
                          {order?.status === "REQUESTED" ? "-" : total * 0.1} €
                        </h3>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium text-primary-dark">
                          Total
                        </h1>
                        <h3 className="text-2xl font-medium text-brand">
                          {order?.status === "REQUESTED"
                            ? "-"
                            : total + total * 0.1}{" "}
                          €
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-[#576070] w-full">
                  {order?.products.map((product, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between w-full",
                        order?.status !== "REQUESTED" && "justify-between"
                      )}>
                      <h1 className="text-lg">{product?.company.name}</h1>
                      <h1 className="text-lg">
                        {product?.name}
                        <span className="text-sm text-[#929AA8]">
                          x{product.quantity}
                        </span>{" "}
                      </h1>
                      {order?.status !== "REQUESTED" && (
                        <h1 className="text-[#929AA8]">{product.price} €</h1>
                      )}
                    </div>
                  ))}
                  {order?.status !== "REQUESTED" && (
                    <div className="flex items-center justify-between">
                      <h1 className="text-[#576070]">
                        {dict?.orders.deliveryFee}
                      </h1>
                      <h1 className="text-[#929AA8]">{order?.shippingFee} €</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientDetailsBody;
