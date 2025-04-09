import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import { CreditCard, FileText, SquareCheckBig, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paySubscription } from "@/backend/mutations/subscription/pay-subscription";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import SubscriptionButtons from "./_components/subscription-buttons";

async function SubscriptionPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
      className="flex flex-col items-center gap-10 p-10 h-screen">
      <Image alt="logo" src={"/auth-logo.svg"} height={120} width={220} />
      <div className="h-full flex items-center justify-center">
        <div className="bg-[#FFFFFF21] p-10 rounded-[38.87px] border border-[#FFFFFF3B] flex items-center gap-10 w-[80%] mx-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-white font-semibold text-2xl">
                {dict.subscription.title}
              </h1>
              <p className="whitespace-break-spaces text-white text-sm">
                {dict.subscription.subTitle}
              </p>
              <h3 className="text-xl font-semibold text-brand">
                10€/{dict.subscription.month}
              </h3>
            </div>
            <div className="space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <SquareCheckBig className="w-4 h-4" />
                </div>
                <h3 className="text-white text-sm">{dict.subscription.sub1}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-white text-sm">{dict.subscription.sub2}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-white text-sm">{dict.subscription.sub3}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-white text-sm">{dict.subscription.sub4}</h3>
              </div>
            </div>
            <SubscriptionButtons dict={dict} />
          </div>
          <Image
            alt="subscription"
            src={"/subscription.png"}
            height={300}
            width={300}
            className="hidden lg:!block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;
