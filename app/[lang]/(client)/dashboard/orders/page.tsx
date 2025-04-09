import { getDictionary } from "@/app/[lang]/dictionaries";
import OrdersFeed from "./_components/orders-feed";
import { currentSubscription, currentUser } from "@/lib/auth";
import { useCurrentSubscription } from "@/hooks/use-current-subscription";

async function OrdersPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="p-8">
      <OrdersFeed dict={dict} />
    </div>
  );
}

export default OrdersPage;
