"use client";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

const CartItem = ({ item }) => {
	const formattedSubTotal = item.subTotal.toString().replace(".", ",");
	const formattedQuantity = item.quantity.toString().replace(".", ",");

	const { deleteFromCart } = useContext(CartContext);

	return (
		<li className="flex mb-4" key={item.id}>
			<div className="mr-auto">
				<p className="text-sm font-medium">{item.name}</p>
				<p className="font-light text-sm">
					{formattedQuantity} {item.unit} × €{item.price}
				</p>
			</div>

			<p className="mr-2">€{formattedSubTotal}</p>

			<button
				x-data="{ tooltip: 'Delete' }"
				onClick={() => {
					deleteFromCart(item.id);
				}}
				className="self-start pt-1"
			>
				<Image src="/img/icon-x-circle.svg" width={14} height={14} alt="" />
			</button>
		</li>
	);
};

export default CartItem;
