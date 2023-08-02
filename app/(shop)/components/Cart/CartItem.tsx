"use client";
import Image from "next/image";

const CartItem = ({ item }) => {
	const formattedSubTotal = item.subTotal.toString().replace(".", ",");
	const formattedQuantity = item.quantity.toString().replace(".", ",");

	return (
		<li className="flex font-mono" key={item.id}>
			<div className="mr-auto">
				<p>{item.name}</p>
				<p>
					{formattedQuantity} {item.unit} × €{item.price}
				</p>
			</div>

			<div className="mr-auto">
				<Image src="/img/icon-x-circle.svg" width={24} height={24} alt="" />
				<p>{formattedSubTotal}</p>
			</div>
		</li>
	);
};

export default CartItem;
