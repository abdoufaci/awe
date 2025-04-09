import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { OrderWithProducts } from "@/types/types";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

interface Props {
  dict: any;
  order: OrderWithProducts;
}

function OrderCard({ dict, order }: Props) {
  const { onOpen } = useModal();

  const total =
    (order?.products.reduce(
      (acc, product) => acc + parseInt(product?.price || "0"),
      0
    ) || 0) + parseInt(order?.shippingFee || "0");

  return (
    <div
      onClick={() => onOpen("clientQuote", { order, dict })}
      className="w-full rounded-xl border border-[#CBCFD7] flex flex-wrap p-10 justify-between gap-10 cursor-pointer">
      <div className="space-y-5">
        <div className="flex items-start gap-5">
          <div className="space-y-1">
            <h1 className="text-[#151515] text-2xl font-semibold">
              {order?.orderId}
            </h1>
            <h1 className="text-[#929AA8]">
              {format(order?.createdAt || new Date(), "dd/MM/yyyy")}
            </h1>
          </div>
          <Button
            //@ts-ignore
            variant={order.status}
            className="text-xs rounded-full">
            {dict.orders[order.status]}
          </Button>
        </div>
        <div className="flex items-start gap-3 relative">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gray-300 mt-1.5"></div>
            <div className="w-0.5 h-5 bg-gray-300"></div>
          </div>
          <div className="pb-0">
            <p className="text-gray-600 font-medium">
              {dict?.quoteHistory[order.orderHistory[0].status]}
            </p>
            <p className="text-gray-400 text-sm">
              {format(
                order.orderHistory[0].createdAt,
                "dd/MM/yyyy HH:mm'GMT' XXX"
              )}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand" />
        <h1 className="text-[#576070] font-medium">{order?.shippingAdress}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[#576070]">
          <span className="font-medium">
            {order.products.length < 10 && "0"}
            {order.products.length}
          </span>{" "}
          {dict.orders.products}
        </h1>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-28">
            <h1 className="text-[#434A57]">{dict?.orders.productsPrice}</h1>
            <h3 className="text-[#929AA8]">
              {order?.status === "REQUESTED" ? "-" : total} €
            </h3>
          </div>
          <div className="flex items-center justify-between gap-28">
            <h1 className="text-[#434A57]">{dict?.orders.serviceFee}</h1>
            <h3 className="text-[#929AA8]">
              {order?.status === "REQUESTED" ? "-" : total * 0.1} €
            </h3>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-28">
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

export default OrderCard;
