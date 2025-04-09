"use client";

import { paySubscription } from "@/backend/mutations/subscription/pay-subscription";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  dict: any;
}

function SubscriptionButtons({ dict }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = async () => {
    startTransition(() => {
      paySubscription()
        .then((url: any) => router.push(url!))
        .catch(() => toast.error("Something went wrong."));
    });
  };
  return (
    <div className="flex items-center gap-5">
      <Button
        disabled={isPending}
        onClick={onClick}
        variant={"brand"}
        size={"lg"}>
        {dict.subscription.subscribe}
      </Button>
      <Button variant={"whiteOutline"} size={"lg"}>
        {dict.subscription.subscribe}
      </Button>
    </div>
  );
}

export default SubscriptionButtons;
