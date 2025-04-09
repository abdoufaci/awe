"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminFilterModal } from "@/filters/use-admin-filter-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const typeSchema = z.object({
  category: z.string(),
});

interface Props {
  dict: any;
}

function CategoryFilter({ dict }: Props) {
  const { onSearch, companyData } = useAdminFilterModal();

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
  });

  const selectedCategory = form.watch("category"); // Watch the 'Brand' field for changes

  useEffect(() => {
    if (selectedCategory) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedCategory, form.handleSubmit]);

  async function onSubmit({ category }: z.infer<typeof typeSchema>) {
    onSearch({
      companyData: {
        ...companyData,
        category,
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-14 w-fit">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full focus-visible:ring-0 text-[#191919]">
                    <SelectValue placeholder={dict.company.category} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"all"}>
                      {dict.company.default}
                    </SelectItem>
                    <SelectItem value={"clothes"}>
                      {dict.company.clothes}
                    </SelectItem>
                    <SelectItem value={"makeup"}>
                      {dict.company.makeup}
                    </SelectItem>
                    <SelectItem value={"food"}>{dict.company.food}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CategoryFilter;
