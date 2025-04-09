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

export const AddCompanyformSchema = z.object({
  name: z.string(),
  category: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string(),
  logo: z.object({
    url: z.string(),
    key: z.string(),
  }),
  catalog: z.object({
    url: z.string(),
    key: z.string(),
  }),
});

export function AddCompanyForm() {
  const [isPending, startTransition] = useTransition();
  const { onClose, data } = useModal();

  const { dict } = data;

  const form = useForm<z.infer<typeof AddCompanyformSchema>>({
    resolver: zodResolver(AddCompanyformSchema),
  });

  async function onSubmit(data: z.infer<typeof AddCompanyformSchema>) {
    startTransition(() => {
      addCompany(data)
        .then(() => {
          toast.success("Success");
          onClose();
        })
        .catch(() => toast.error("Something went wrong, try again."));
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
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-3 w-full relative">
                    <CompanyImageUpload
                      //@ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="logoUploader"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  {dict?.company?.name}*
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="title"
                    className="w-full text-xs rounded-lg border border-[#CFCFCF] p-2 focus:outline-none 
                    focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  {dict?.company?.category}*
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full focus-visible:ring-0 text-[#191919] border-[#CBCFD7]">
                      <SelectValue placeholder={dict?.company?.category} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"all"}>
                        {dict?.company?.default}
                      </SelectItem>
                      <SelectItem value={"clothes"}>
                        {dict?.company?.clothes}
                      </SelectItem>
                      <SelectItem value={"makeup"}>
                        {dict?.company?.makeup}
                      </SelectItem>
                      <SelectItem value={"food"}>
                        {dict?.company?.food}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  Adress*
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
          <FormField
            control={form.control}
            name="catalog"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  Catalogue*
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  {dict?.company?.phone}*
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="phone"
                    className="w-full text-xs rounded-lg border border-[#CFCFCF] p-2 focus:outline-none 
                    focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full text-[#15091B]">
                <FormLabel htmlFor="slogan" className="text-[#576070]">
                  Website*
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
