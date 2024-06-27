"use client";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";

const CartItem = ({ item }) => {
	const { deleteFromCart } = useContext(CartContext);

	return (
		<li className="flex mb-4 border-b border-dashed border-zinc-100" key={item.id}>
			<div className="mr-auto">
				<p className="">{item.name}</p>
			</div>

			<p className="mr-2">
				{item.quantity}
				<span className="text-sm">{item.unit} </span>
			</p>

			<button
				x-data="{ tooltip: 'Delete' }"
				onClick={() => {
					deleteFromCart(item.id);
				}}
				className="self-start pt-1"
			>
				<Image src="/img/new-delete-icon.svg" width={18} height={18} alt="" />
			</button>
		</li>
	);
};

export default CartItem;
