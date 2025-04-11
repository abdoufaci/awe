import { getAnalytics } from "@/backend/queries/admin/get-analytics";
import AnalyticCard from "./_components/analytic-card";
import { getDictionary } from "../dictionaries";
import AnalyticsChart from "./_components/analytics-chart";

async function AdminPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const {
    orders,
    subscribers,
    groupedOrders,
    groupedSubscribers,
    usersWithOrders,
  } = await getAnalytics();

  return (
    <div className="p-5 space-y-7">
      <div className="grid grid-cols-4 gap-5">
        <AnalyticCard items={orders} title={dict.analytic.orders} />
        <AnalyticCard items={subscribers} title={dict.analytic.subscribers} />
        <AnalyticCard items={[]} title={dict.analytic.visitors} />
        <AnalyticCard
          isConversion
          conversion={Math.floor(
            (usersWithOrders.length * 100) / subscribers.length
          )}
          items={[]}
          title={dict.analytic.conversionRate}
        />
      </div>
      <div className="max-[860px]:grid-cols-1 grid grid-cols-8 gap-4">
        <div className="border rounded-md min-[860px]:col-span-5">
          <AnalyticsChart
            dict={dict}
            orders={groupedOrders}
            subscribers={groupedSubscribers}
          />
        </div>
        <div className="border p-4 rounded-md min-[860px]:col-span-3">
          {/* <RankedCountries topVisitorsCountries={topVisitorsCountries} /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
