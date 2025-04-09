import { useSession } from "next-auth/react";

export const useCurrentSubscription = () => {
  const session = useSession();

  return session.data?.user.isSubscribed;
};
