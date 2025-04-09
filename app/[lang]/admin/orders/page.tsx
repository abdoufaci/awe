import { getDictionary } from "../../dictionaries";
import OrdersFeed from "./_components/orders-feed";
import OrdersHeader from "./_components/orders-header";

async function OrdersPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="p-5 space-y-7">
      <OrdersHeader dict={dict} />
      <OrdersFeed dict={dict} />
    </div>
  );
}

export default OrdersPage;
