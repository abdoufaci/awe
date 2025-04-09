import { ShoppingCart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AddToCartForm } from "./forms/add-to-cart-form";
import { getCompanies } from "@/backend/queries/admin/get-companies";

interface Props {
  dict: any;
}

async function Cart({ dict }: Props) {
  const companies = await getCompanies();

  return (
    <Popover>
      <PopoverTrigger>
        <ShoppingCart className="h-5 w-5 text-[#434A57]" />
      </PopoverTrigger>
      <PopoverContent side="left" className="w-full max-w-[946px]">
        <AddToCartForm dict={dict} companies={companies} />
      </PopoverContent>
    </Popover>
  );
}

export default Cart;
