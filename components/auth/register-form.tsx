"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/backend/auth-actions/register";
import { useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { countryCodes } from "@/constants/country-codes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  dict: any;
}

export function RegisterForm({ dict }: Props) {
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean);
  const local = pathParts?.[0];
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirectUrl");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+44",
    flag: "🇬🇧",
    name: "United Kingdom",
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values, dict, selectedCountry).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      mainHeaderLabel={dict.auth.register}
      headerLabel={dict.auth.registerLabel}
      backButtonLabel={dict.auth.registerBackButtonLabel}
      backButtonHref={
        redirectUrl
          ? `/${local}/auth/login?redirectUrl=${redirectUrl}`
          : `/${local}/auth/login`
      }
      backButtonLinkLabel={dict.auth.registerBackButtonLinkLabel}
      showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.namePlaceholder}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.emailPlaceholder}
                      className="border-white border-[0.54px] text-white placeholder:text-white py-6 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.passwordPlaceholder}
                      type="password"
                      className="border-white border text-white placeholder:text-white py-6 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex items-center gap-1 w-[110px] justify-between border-white border-[0.54px] text-white placeholder:text-white py-6 rounded-xl bg-transparent">
                            <span>{selectedCountry.code}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[200px]">
                          <ScrollArea className="h-52">
                            {countryCodes
                              .sort(
                                (a, b) =>
                                  Number(a.code.slice(1)) -
                                  Number(b.code.slice(1))
                              )
                              .map((country) => (
                                <DropdownMenuItem
                                  key={country.code}
                                  onClick={() => setSelectedCountry(country)}
                                  className="cursor-pointer">
                                  <span>{country.name}</span>
                                  <span className="ml-auto text-muted-foreground">
                                    {country.code}
                                  </span>
                                </DropdownMenuItem>
                              ))}
                          </ScrollArea>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        className="border-white border text-white placeholder:text-white py-6 rounded-xl flex-1"
                        {...field}
                        disabled={isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            variant={"white"}
            type="submit"
            disabled={isPending}
            className="w-full">
            Crate an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
