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
import { Company } from "@prisma/client";
import { CircleFadingPlus } from "lucide-react";
import { addOrder } from "@/backend/mutations/order/add-order";
import { logout } from "@/backend/auth-actions/logout";

export const AddToCartformSchema = z.object({
  products: z.array(
    z.object({
      companyName: z.string(),
      productName: z.string(),
      quantity: z.string(),
    })
  ),
  address: z.string(),
});

interface Props {
  dict: any;
  companies: Company[];
}

export function AddToCartForm({ dict, companies }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddToCartformSchema>>({
    resolver: zodResolver(AddToCartformSchema),
    defaultValues: {
      products: [
        {
          companyName: "",
          productName: "",
          quantity: "",
        },
      ],
    },
  });

  const WatchedProducts = form.watch("products");

  async function onSubmit(data: z.infer<typeof AddToCartformSchema>) {
    startTransition(() => {
      addOrder(data)
        .then(() => {
          toast.success("Success");
          form.reset();
        })
        .catch(() => toast.error("Something went wrong, try again."));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 w-full">
          <h1 className="font-semibold text-lg">{dict.cart.cart}</h1>
          <CircleFadingPlus
            color="#1E78FF"
            strokeWidth={1.25}
            style={{
              backgroundColor: "#E7F1F8",
            }}
            className="rounded-full cursor-pointer"
            onClick={() => {
              console.log("e");
              form.setValue("products", [
                ...WatchedProducts,
                {
                  companyName: "",
                  productName: "",
                  quantity: "",
                },
              ]);
            }}
          />
        </div>
        <div className="space-y-5 flex flex-col items-center w-full">
          {WatchedProducts.map((product, index) => {
            return (
              <div className="flex items-center gap-2 w-full">
                <div className="w-full space-y-1.5">
                  {index === 0 && (
                    <h1 className="text-sm text-[#576070]">
                      {dict.cart.companyName}
                    </h1>
                  )}
                  <Select
                    onValueChange={(value) => {
                      WatchedProducts[index].companyName = value;
                      form.setValue("products", WatchedProducts);
                    }}>
                    <FormControl>
                      <SelectTrigger className="w-full focus-visible:ring-0 text-[#191919] border-[#CBCFD7]">
                        <SelectValue placeholder={dict?.company?.category} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full space-y-1.5">
                  {index === 0 && (
                    <h1 className="text-sm text-[#576070]">
                      {dict.cart.productName}
                    </h1>
                  )}
                  <Input
                    type="text"
                    id="title"
                    className="w-full text-xs rounded-lg border border-[#CFCFCF] p-2 focus:outline-none 
                    focus:ring-0"
                    value={product.productName}
                    onChange={(e) => {
                      WatchedProducts[index].productName = e.target.value;
                      form.setValue("products", WatchedProducts);
                    }}
                  />
                </div>
                <div className="w-36 space-y-1.5">
                  {index === 0 && (
                    <h1 className="text-sm text-[#576070]">
                      {dict.cart.quantity}
                    </h1>
                  )}
                  <Input
                    type="number"
                    id="title"
                    className="w-full text-xs rounded-lg border border-[#CFCFCF] p-2 focus:outline-none 
                    focus:ring-0"
                    value={product.quantity}
                    onChange={(e) => {
                      WatchedProducts[index].quantity = e.target.value;
                      form.setValue("products", WatchedProducts);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  {dict.cart.shippingAdress}*
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="adress"
                    className="w-full text-xs rounded-lg border border-[#CFCFCF] p-2 focus:outline-none 
                              focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant={"gradient_brand"}
          size={"lg"}
          className="h-11 w-full">
          Ajouter
        </Button>
      </form>
    </Form>
  );
}
