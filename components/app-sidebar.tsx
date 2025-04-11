"use client";

import * as React from "react";
import {
  Building2,
  Landmark,
  LayoutDashboard,
  ListTodo,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { GoodTimes, Laviossa } from "@/app/fonts";
import {
  AdminNav,
  ClientDashboardNav,
  companiesNav,
} from "@/constants/navigations";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  dict: any;
}

export function AppSidebar({
  dict,
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
  const pathname = usePathname();
  const mainPart = pathname.split("/")[2];

  return (
    <Sidebar
      collapsible="icon"
      className={cn("block", mainPart === "companies" && "border-none")}
      {...props}>
      <SidebarHeader className="border-b border-r-0">
        <div className="flex flex-col items-center justify-center gap-1">
          <Image
            alt="logo"
            src={"/logo.svg"}
            height={100}
            width={150}
            className="object-cover"
          />
          <h1 style={GoodTimes.style} className="text-[#182233] text-[9px]">
            Algeria World Export
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            mainPart === "admin"
              ? AdminNav
              : mainPart === "companies"
              ? companiesNav(dict)
              : ClientDashboardNav
          }
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
