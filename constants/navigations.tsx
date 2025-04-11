import {
  Building2,
  Landmark,
  LayoutDashboard,
  ListTodo,
  Settings,
  User2,
} from "lucide-react";

export const AdminNav = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ListTodo,
  },
  {
    title: "Companies",
    url: "/admin/companies",
    icon: Building2,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User2,
    items: [
      {
        title: "Customers",
        url: "/admin/users?type=client",
      },
      {
        title: "Employees",
        url: "/admin/users?type=emoloyee",
      },
    ],
  },
  {
    title: "Payment",
    url: "/admin/payments",
    icon: Landmark,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const ClientDashboardNav = [
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ListTodo,
  },
  {
    title: "Payment",
    url: "/dashboard/payments",
    icon: Landmark,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export const companiesNav = (dict: any) => [
  {
    title: "All Categories",
    url: "/companies",
    icon: Building2,
    items: [
      {
        title: `${dict?.company?.clothes}`,
        url: "/companies?category=clothes",
      },
      {
        title: `${dict?.company?.makeup}`,
        url: "/companies?category=makeup",
      },
      {
        title: `${dict?.company?.food}`,
        url: "/companies?category=food",
      },
    ],
  },
];
