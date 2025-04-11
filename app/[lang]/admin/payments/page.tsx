import React from "react";
import PaymentsSearchFilter from "./_components/payments-search-filter";
import PaymentsFeed from "./_components/payments-feed";
import { getDictionary } from "../../dictionaries";

async function PaymentsPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="p-5 space-y-7">
      <PaymentsSearchFilter dict={dict} />
      <PaymentsFeed dict={dict} />
    </div>
  );
}

export default PaymentsPage;
