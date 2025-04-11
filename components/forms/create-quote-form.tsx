"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/useModalStore";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyImageUpload } from "../company-image-upload";
import { addCompany } from "@/backend/mutations/company-actions/add-company";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { confirmOrder } from "@/backend/mutations/order/confirm-order";
import { useOrdersByUserQuery } from "@/hooks/use-query-orders-by-user";

export const CreateQuoteformSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      price: z.string(),
    })
  ),
  shippingFee: z.string(),
});

export function CreateQuoteForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, data } = useModal();
  const { refetch } = useOrdersByUserQuery();

  const { dict, order } = data;

  const form = useForm<z.infer<typeof CreateQuoteformSchema>>({
    resolver: zodResolver(CreateQuoteformSchema),
    defaultValues: {
      products: order?.products.map((product) => ({
        id: product.id,
        price: "",
      })),
    },
  });

  const WatchedProducts = form.watch("products");
  const WatchedShipping = form.watch("shippingFee");

  async function onSubmit(data: z.infer<typeof CreateQuoteformSchema>) {
    startTransition(() => {
      confirmOrder({
        orderId: order?.id || "",
        data,
      })
        .then(() => {
          toast.success(dict?.orders.success);
          refetch();
          onClose();
        })
        .catch(() => toast.error(dict?.orders.error));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-between h-[400px]">
        <div className="space-y-2 flex flex-col items-center w-full h-full">
          <div className="grid grid-cols-4 place-content-between w-full">
            <h1 className="text-[#929AA8]">{dict?.orders.company}</h1>
            <h1 className="text-[#929AA8]">{dict?.orders.product}</h1>
            <h1 className="text-[#929AA8]">{dict?.cart.quantity}</h1>
            <h1 className="text-[#929AA8]">{dict?.orders.price}</h1>
          </div>
          <Separator />
          <div className="space-y-4 w-full h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {order?.products.map((product, index) => (
                <div className="grid grid-cols-4 items-center w-full text-[#434A57]">
                  <h1>{product?.company.name}</h1>
                  <h1>{product?.name}</h1>
                  <h1>{product.quantity}</h1>
                  <Input
                    value={WatchedProducts[index]?.price}
                    onChange={(e) => {
                      if (WatchedProducts[index]) {
                        WatchedProducts[index].price = e.target.value;
                      }
                      form.setValue("products", WatchedProducts);
                    }}
                    className="w-20 border border-[#CBCFD7] rounded-md"
                    placeholder={dict?.orders.price}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 items-center w-full">
              <h1>{dict?.orders.shipping}</h1>
              <h1></h1>
              <h1></h1>
              <Input
                value={WatchedShipping}
                onChange={(e) => {
                  form.setValue("shippingFee", e.target.value);
                }}
                className="w-20 border border-[#CBCFD7] rounded-md"
                placeholder={dict?.orders.price}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant={"gradient_brand"}
          size={"lg"}
          className="h-11 w-full">
          {dict?.orders.confirm}
        </Button>
      </form>
    </Form>
  );
}
