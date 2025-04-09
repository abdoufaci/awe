import { useModal } from "@/hooks/useModalStore";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import ClientQuoteHeader from "./client-quote-header";

function ClientQuoteBody() {
  const { data } = useModal();
  const { dict, order } = data;

  const total =
    (order?.products.reduce(
      (acc, product) => acc + parseInt(product?.price || "0"),
      0
    ) || 0) + parseInt(order?.shippingFee || "0");

  return (
    <div className="space-y-10">
      <ClientQuoteHeader fee={total * 0.1} />
      <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-14">
        <div className="space-y-4">
          <h1 className="font-medium text-primary-dark">
            {dict?.orders.tracking}
          </h1>
          <div className="-space-y-1.5">
            {order?.orderHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mt-1.5"></div>
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div className="pb-2">
                  <p className="text-gray-600 font-medium whitespace-nowrap">
                    {dict?.quoteHistory[item.status]}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {format(item.createdAt, "dd/MM/yyyy HH:mm'GMT' XXX")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-medium text-primary-dark">
            {dict?.orders.products}
          </h1>
          <div className="space-y-2 text-[#576070]">
            {order?.products.map((product, index) => (
              <div
                key={index}
                className={cn("flex items-center justify-between")}>
                <h1 className="text-lg">{product?.name} </h1>
                <div className="flex items-center gap-7">
                  <h1 className="text-[#929AA8]">x{product.quantity}</h1>
                  {order?.status !== "REQUESTED" && (
                    <h1 className="text-[#929AA8]">{product.price} €</h1>
                  )}
                </div>
              </div>
            ))}
            {order?.status !== "REQUESTED" && (
              <div className="flex items-center justify-between">
                <h1 className="text-[#576070]">{dict?.orders.deliveryFee}</h1>
                <h1 className="text-[#929AA8]">{order?.shippingFee} €</h1>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="font-medium text-primary-dark">Total</h1>
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
                <h1 className="text-2xl font-medium text-primary-dark">
                  Total
                </h1>
                <h3 className="text-2xl font-medium text-brand">
                  {order?.status === "REQUESTED" ? "-" : total + total * 0.1} €
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientQuoteBody;
