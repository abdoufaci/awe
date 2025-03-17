export const protectedRoutes = [
  "/en/admin",
  "/fr/admin",
  "/en/admin/*",
  "/fr/admin/*",
];

export const authRoutes = [
  "/fr/auth/login",
  "/fr/auth/register",
  "/fr/auth/error",
  "/fr/auth/reset",
  "/fr/auth/new-password",
  "/en/auth/login",
  "/en/auth/register",
  "/en/auth/error",
  "/en/auth/reset",
  "/en/auth/new-password",
];

export const apiAuthPrefix = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/fr/admin";
