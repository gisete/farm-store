"use client";
import Image from "next/image";

const CartItem = ({ item }) => {
	return (
		<li className="flex" key={item.id}>
			<div className="mr-auto">
				<p>{item.name}</p>
				<p>
					{item.quantity} {item.unit} × €{item.price}
				</p>
			</div>

			<div className="mr-auto">
				<Image src="/img/icon-x-circle.svg" width={24} height={24} alt="" />
				<p>{item.subTotal}</p>
			</div>
		</li>
	);
};

export default CartItem;
