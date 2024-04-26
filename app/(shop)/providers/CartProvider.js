"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [showContactForm, setShowContactForm] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);
	const [orderSent, setOrderSent] = useState(false);
	const [isCartOpen, setCartOpen] = useState(false);

	function clearCart() {
		setCart([]);
		localStorage.removeItem("cart");
	}

	function deleteFromCart(id) {
		const newCart = cart.filter((item) => item.id !== id);

		if (newCart.length < 1) {
			clearCart();
		} else {
			setCart(newCart);
		}
	}

	useEffect(() => {
		const getBodyElement = document.querySelector("body");

		if (isCartOpen) {
			getBodyElement.style.overflow = "hidden";
		} else {
			getBodyElement.style.overflow = "auto";
		}
	}, [isCartOpen]);

	useEffect(() => {
		const cartTotal = cart.reduce((acc, item) => acc + item.subTotal, 0);
		setCartTotal(cartTotal);

		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			setCart(cart);
		}
	}, []);

	const value = {
		cart,
		setCart,
		cartTotal,
		clearCart,
		deleteFromCart,
		showContactForm,
		setShowContactForm,
		orderSent,
		setOrderSent,
		setCartOpen,
		isCartOpen,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
