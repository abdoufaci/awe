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
import { uploadBankDocument } from "@/backend/mutations/order/upload-bank-document";
import { useOrdersByUserQuery } from "@/hooks/use-query-orders-by-user";

export const UploadDocumentformSchema = z.object({
  document: z.object({
    url: z.string(),
    key: z.string(),
  }),
});

export function UploadDocumentForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, data, onOpen } = useModal();
  const { refetch } = useOrdersByUserQuery();

  const { dict, order } = data;

  const form = useForm<z.infer<typeof UploadDocumentformSchema>>({
    resolver: zodResolver(UploadDocumentformSchema),
  });

  async function onSubmit(data: z.infer<typeof UploadDocumentformSchema>) {
    startTransition(() => {
      uploadBankDocument(data, order?.id || "")
        .then(() => {
          toast.success("Success");
          onClose();
          refetch();
        })
        .catch(() => toast.error("Something went wrong ."));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-center">
        <div className="space-y-5 flex flex-col items-center w-full">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  Document*
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 w-full relative">
                    <CompanyImageUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="labelFile"
                    />
                  </div>
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
