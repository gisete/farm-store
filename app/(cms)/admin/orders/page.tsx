import OrdersTable from "../../components/OrdersTable";
const Orders = () => {
	return (
		<section className="p-10">
			<div className="mb-5">
				<h1 className="text-2xl">Orders</h1>
			</div>
			<OrdersTable />
		</section>
	);
};

export default Orders;
