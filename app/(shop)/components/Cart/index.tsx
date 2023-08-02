"use client";

import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import Link from "next/link";

const Cart = () => {
	const { cart, cartTotal } = useContext(CartContext);

	return (
		<div className="p-4 w-64 h-screen">
			<div className="border font-mono h-24 min-h-[50%] border-stone-700 bg-stone-100 p-4">
				<ul>
					{cart.map((item) => (
						<CartItem item={item} />
					))}
				</ul>

				<div className="flex justify-between">Total: €{cartTotal}</div>

				<Link href="/carrinho">
					<button className="border border-stone-900 px-4 py-2 rounded-md">Finalizar pedido</button>
				</Link>
			</div>
		</div>
	);
};

export default Cart;
