import { useModal } from "@/hooks/useModalStore";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Download, MapPin } from "lucide-react";
import { useTransition } from "react";
import { payOrderFees } from "@/backend/mutations/order/pay-order-fees";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

interface Props {
  fee: number;
}

function ClientQuoteHeader({ fee }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data, onOpen } = useModal();

  const { dict, order } = data;

  if (!order) {
    return;
  }

  const onClick = () => {
    startTransition(() => {
      payOrderFees(order?.id, fee, order?.products)
        .then((data) => {
          toast.success("Success");
          router.push(data!);
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="flex items-start flex-wrap gap-5 justify-between">
      <div className="flex items-start gap-5">
        <div className="space-y-1">
          <h1 className="text-[#151515] text-2xl font-semibold">
            {order?.orderId}
          </h1>
          <h1 className="text-[#929AA8]">
            {format(order?.createdAt || new Date(), "dd/MM/yyyy")}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Button
            //@ts-ignore
            variant={order?.status}
            className="text-xs rounded-full">
            {
              dict?.orders[
                //@ts-ignore
                order?.status
              ]
            }
          </Button>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand" />
            <h1 className="text-[#576070] font-medium">
              {order?.shippingAdress}
            </h1>
          </div>
        </div>
      </div>
      {order?.status === "CONFIRMED" && (
        <Button
          onClick={onClick}
          disabled={isPending}
          variant={"brand"}
          size={"lg"}
          className="rounded-full">
          {dict?.orders.confirmOrder}
        </Button>
      )}
      {order?.status === "PAIED" && (
        <div className="flex items-center gap-5">
          <Button variant={"brandOutline"} size={"lg"} className="rounded-full">
            <Download className="h-4 w-4" />
            {dict?.orders.downloadDocument}
          </Button>
          <Button
            onClick={() => onOpen("uploadDocument", { order, dict })}
            variant={"brand"}
            size={"lg"}
            className="rounded-full">
            {dict?.orders.uploadBankConfirmation}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ClientQuoteHeader;
