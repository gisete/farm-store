"use client";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import ContactForm from "../ContactForm";
import Image from "next/image";

type CartProps = {
	hideButton: boolean;
};

const Cart = ({ hideButton }: CartProps) => {
	const { cart, cartTotal, showContactForm, setShowContactForm, orderSent } = useContext(CartContext);
	const [isCartOpen, setCartOpen] = useState(false);

	const [formValues, setFormValues] = useState({
		id: "",
		name: "",
		phone: "",
		comment: "",
		products: cart,
		total: cartTotal,
		date: "",
	});

	// for when the cart updates after getting localstorage values
	useEffect(() => {
		setFormValues({
			...formValues,
			products: cart,
		});
	}, [cart]);

	return (
		<>
			<div
				className={`bg-white w-full fixed md:w-100 md:static top-0 bottom-0 right-0 translate-x-full md:transform-none cart-closed z-10 ${
					isCartOpen ? "cart-open" : ""
				}`}
			>
				<div className="pt-20 md:pt-6 p-6 flex flex-col">
					<h2 className="text-center text-lg mb-6">Cabaz</h2>

					<button
						type="button"
						className="bg-zinc-100 absolute top-4 right-6 p-4 inline-flex items-center justify-center text-black focus:outline-none focus:ring-2 focus:ring-inset w-[55px] h-[55px] rounded-full"
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
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<ul>
						{cart.map((item, index) => (
							<CartItem item={item} key={`cartitem-${index}`} />
						))}
					</ul>

					{orderSent && <p className="text-center">Encomenda enviada com sucesso</p>}

					{cart.length === 0 && !orderSent && <p className="text-center">O cabaz está vazio</p>}

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
									onChange={(e) => setFormValues({ ...formValues, comment: e.target.value })}
								></textarea>
							</div>

							{showContactForm && <ContactForm formValues={formValues} setFormValues={setFormValues} />}

							{showContactForm ? null : (
								<div className="text-center mt-8">
									<button
										className="px-6 py-3 bg-zinc-100 text-black border border-zinc-500 font-body hover:bg-zinc-200 transition"
										onClick={() => setShowContactForm(true)}
									>
										Confirmar encomenda
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
			<button
				className="fixed w-20 h-20 top-4 right-0 bg-orange-300 text-white active:bg-orange-500 px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
				onClick={() => setCartOpen(true)}
			>
				<Image src="/img/icon-basket.png" width={40} height={40} alt="Picture of the author" />
			</button>
		</>
	);
};

export default Cart;
