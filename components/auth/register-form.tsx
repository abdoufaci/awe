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

interface Props {
  dict: any;
}

export function RegisterForm({ dict }: Props) {
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean);
  const local = pathParts?.[0];
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get("redirectUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values, dict).then((data) => {
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
                  <FormLabel>{dict.auth.name}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.namePlaceholder}
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.emailPlaceholder}
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
                  <FormLabel>{dict.auth.password}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={dict.auth.passwordPlaceholder}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            variant={"gradient_brand"}
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
