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
		<div className="w-100 border-l border-black">
			<div className="p-6 flex flex-col">
				<h4 className="text-center text-lg mb-6">Cabaz</h4>
				<ul>
					{cart.map((item, index) => (
						<CartItem item={item} key={`cartitem-${index}`} />
					))}
				</ul>

				{cart.length === 0 ? (
					<p className="text-center">O cabaz está vazio</p>
				) : (
					<>
						<div className="mt-2 mb-auto">
							<p className="text-right text-xl">Total: €{cartTotal}</p>
						</div>

						<div className="mt-2">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								htmlFor="comment"
							>
								Nota
							</label>
							<textarea
								name="comment"
								className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
								form="usrform"
								id="comment"
							></textarea>
						</div>
						{hideButton ? null : (
							<Link href="/cabaz" className="text-center mt-12">
								<button className="px-6 py-3 bg-zinc-100 text-black border border-zinc-500 font-body hover:bg-zinc-200 transition">
									Enviar pedido
								</button>
							</Link>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
