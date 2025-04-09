"use client";

import { useModal } from "@/hooks/useModalStore";
import OrderRightSide from "./order-right-side";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function OrdersBody() {
  const { data, onOpen } = useModal();
  const { order, dict } = data;

  console.log({
    order,
  });

  return (
    <div className="w-full h-[500px] grid grid-cols-1 md:!grid-cols-[55%,45%]">
      <div className="space-y-10 pr-5">
        <div className="space-y-2">
          <Button
            //@ts-ignore
            variant={order?.status}
            className="p-1 px-2 text-xs">
            {dict?.orders[order?.status || ""]}
          </Button>
          <div className="flex items-center gap-5">
            <h1 className="text-[#151515] text-2xl font-semibold">
              {order?.orderId}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" />
              <h1 className="text-[#576070] font-medium">
                {order?.shippingAdress}
              </h1>
            </div>
          </div>
          <h1 className="text-[#929AA8]">
            {format(order?.createdAt || new Date(), "dd/MM/yyyy")}
          </h1>
        </div>
        <div className="-space-y-1.5">
          {order?.orderHistory.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mt-1.5"></div>
                <div className="w-0.5 h-12 bg-gray-300"></div>
              </div>
              <div className="pb-2">
                <p className="text-gray-600 font-medium whitespace-nowrap">
                  {dict?.quoteHistory[item.status]}{" "}
                  {item.status === "DOCCONFIRMATION" && (
                    <span
                      onClick={() => onOpen("reviewDocument", { order, dict })}
                      className="text-brand underline cursor-pointer">
                      {dict?.quoteHistory.viewDocs}
                    </span>
                  )}
                </p>
                <p className="text-gray-400 text-sm">
                  {format(item.createdAt, "dd/MM/yyyy HH:mm'GMT' XXX")}
                </p>
              </div>
            </div>
          ))}
        </div>
        {order?.status === "DOCCONFIRMATION" && (
          <Button
            onClick={() => onOpen("reviewDocument", { order, dict })}
            size={"lg"}
            variant={"brand"}
            className="w-full">
            {dict?.orders.reviewDocument}
          </Button>
        )}
        <div className="space-y-4">
          {order?.status === "REQUESTED" && (
            <h1 className="text-2xl text-primary-dark font-medium">
              {dict?.orders.products}
            </h1>
          )}
          <div className="space-y-2 text-[#576070]">
            {order?.products.map((product, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-14",
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
                <h1 className="text-[#576070]">{dict?.orders.deliveryFee}</h1>
                <h1 className="text-[#929AA8]">{order?.shippingFee} €</h1>
              </div>
            )}
          </div>

          {order?.status === "REQUESTED" && (
            <Button
              onClick={() => onOpen("createQuote", { order, dict })}
              size={"lg"}
              variant={"brand"}
              className="w-full">
              {dict?.orders.createQuote}
            </Button>
          )}
        </div>
      </div>
      <OrderRightSide />
    </div>
  );
}

export default OrdersBody;
