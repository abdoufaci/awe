"use client";

import { companiesNav } from "@/constants/navigations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarRail,
} from "./ui/sidebar";
import { NavMain } from "./nav-main";

interface Props {
  dict: any;
}

function CompaniesNavigation({
  dict,
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  return (
    <Sidebar collapsible="icon" className={cn("block border-none")} {...props}>
      <SidebarContent className="pt-[85px]">
        <NavMain items={companiesNav(dict)} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default CompaniesNavigation;
