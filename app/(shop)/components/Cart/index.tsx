"use client";

import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";

const Cart = () => {
	const { cart, cartTotal } = useContext(CartContext);

	return (
		<div className="p-4 w-64 h-screen">
			<div className="border h-24 min-h-[50%] border-stone-700 bg-stone-100 p-4">
				<ul>
					{cart.map((item) => (
						<CartItem item={item} />
					))}
				</ul>

				<div className="flex justify-between">Total: {cartTotal}</div>
			</div>
		</div>
	);
};

export default Cart;
