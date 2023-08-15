"use client";

import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import Link from "next/link";

type CartProps = {
	hideButton: boolean;
};

const Cart = ({ hideButton }: CartProps) => {
	const { cart, cartTotal } = useContext(CartContext);

	return (
		<div className="w-64 h-screen border-l border-black bg-zinc-50">
			<div className="h-24 min-h-[50%] p-6 flex flex-col">
				<h4 className="text-center text-lg mb-6">Cabaz</h4>
				<ul>
					{cart.map((item) => (
						<CartItem item={item} />
					))}
				</ul>

				{cart.length === 0 ? (
					<p className="text-center">O cabaz está vazio</p>
				) : (
					<>
						<div className="mt-4 mb-auto">
							<p className="text-right text-lg">Total: €{cartTotal}</p>
						</div>
						{hideButton ? null : (
							<Link href="/cabaz" className="text-center">
								<button className="px-6 py-4 bg-zinc-800 text-white rounded font-body">Finalizar pedido</button>
							</Link>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
