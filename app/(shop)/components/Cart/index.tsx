"use client";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import ContactForm from "../ContactForm";
import Image from "next/image";
import ConfirmationWindow from "./ConfirmationWindow";

type CartProps = {
	hideButton: boolean;
};

type ProductItem = {
	id: string;
	name: string;
	quantity: number;
	unit: string;
	price: number;
};

const Cart = ({ hideButton }: CartProps) => {
	const [mounted, setMounted] = useState(false);
	const { cart, cartTotal, order, setOrder, isCartOpen, setCartOpen, hasError, orderSent } = useContext(CartContext);

	const handleCartUpdate = () => {
		if (!mounted) return;

		setOrder({
			...order,
			products: cart,
		});
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		handleCartUpdate();
	}, [cart, mounted]);

	if (!mounted) {
		return (
			<>
				<div className="bg-white w-full fixed md:w-100 md:static top-0 bottom-0 right-0 translate-x-full md:transform-none cart-closed z-10 overflow-scroll md:sticky top-0">
					<div className="pt-20 md:pt-10 p-6 flex flex-col">
						<h2 className="text-center text-lg mb-6 uppercase tracking-wide font-semibold">Cabaz</h2>
						<p className="text-center text-zinc-400">Loading...</p>
					</div>
				</div>
				<button
					className="fixed w-20 h-20 top-5 right-2 bg-orange-300 text-white px-6 py-3 rounded-full shadow md:hidden"
					type="button"
				>
					<Image src="/img/icon-basket.png" width={40} height={40} alt="Picture of the author" />
				</button>
			</>
		);
	}

	return (
		<>
			<div
				className={`bg-white w-full fixed md:w-100 md:static top-0 bottom-0 right-0 translate-x-full md:transform-none cart-closed z-10 overflow-scroll md:sticky top-0 ${
					isCartOpen ? "cart-open" : ""
				}`}
				suppressHydrationWarning={true}
			>
				<button
					type="button"
					className="bg-zinc-100 absolute top-4 right-6 p-4 inline-flex items-center justify-center text-black focus:outline-none focus:ring-2 focus:ring-inset w-[55px] h-[55px] rounded-full md:hidden"
					onClick={() => setCartOpen(false)}
				>
					<span className="sr-only">Close menu</span>
					<svg
						className="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{!orderSent && (
					<div className="pt-20 md:pt-10 p-6 flex flex-col">
						<h2 className="text-center text-lg mb-6 uppercase tracking-wide font-semibold">Cabaz</h2>

						<ul>
							{cart.map((productItem: ProductItem, index: number) => (
								<CartItem item={productItem} key={`cartitem-${index}`} />
							))}
						</ul>

						{cart.length === 0 && !orderSent && <p className="text-center text-zinc-400">O cabaz está vazio</p>}

						{cart.length > 0 && !orderSent && (
							<>
								<div className="mt-6">
									<label
										className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
										htmlFor="comment"
									>
										Comentário
									</label>
									<textarea
										name="comment"
										className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
										form="usrform"
										id="comment"
										onChange={(e) => setOrder({ ...order, comment: e.target.value })}
									></textarea>
								</div>

								<ContactForm />
							</>
						)}
					</div>
				)}

				{orderSent && <ConfirmationWindow orderSent={orderSent} hasError={hasError} />}
			</div>

			<button
				className="fixed w-20 h-20 top-5 right-2 bg-orange-300 text-white active:bg-orange-500 px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:hidden"
				type="button"
				onClick={() => setCartOpen(true)}
				suppressHydrationWarning={true}
			>
				{order.products.length > 0 && (
					<div className="absolute bg-red-500 rounded-full w-8 h-8 justify-center items-center right-0 -top-1 flex">
						{order.products.length}
					</div>
				)}

				<Image src="/img/icon-basket.png" width={40} height={40} alt="Picture of the author" />
			</button>
		</>
	);
};

export default Cart;
