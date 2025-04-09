import OrdersSearchFilter from "./orders-search-filter";

interface Props {
  dict: any;
}

function OrdersHeader({ dict }: Props) {
  return (
    <div className="flex items-center justify-between">
      <OrdersSearchFilter dict={dict} />
    </div>
  );
}

export default OrdersHeader;
