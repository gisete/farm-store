"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
	const [mounted, setMounted] = useState(false);
	const [cart, _setCart] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showContactForm, setShowContactForm] = useState(false);
	const [orderSent, setOrderSent] = useState(false);
	const [isCartOpen, setCartOpen] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isOrderSending, setIsOrderSending] = useState(false);
	const [order, setOrder] = useState({
		name: "",
		phone: "",
		comment: "",
		products: [],
	});

	// This is called specifically after successful order submission
	const _clearCartData = () => {
		_setCart([]); // Use internal setter to bypass flag reset
		if (mounted) {
			localStorage.removeItem("cart"); // Clear storage directly only if mounted
		}
		console.log("Cart data cleared post-order."); // Optional log
	};

	// Wrapper for general cart updates (add, update quantity in ItemRow)
	// Resets order/error flags when user interacts with cart AFTER an order attempt
	const setCart = (newCartDataOrCallback) => {
		if (orderSent || hasError) {
			// Reset flags if user modifies cart after order attempt
			setOrderSent(false);
			setHasError(false);
		}
		if (typeof newCartDataOrCallback === "function") {
			_setCart(newCartDataOrCallback);
		} else {
			_setCart(newCartDataOrCallback);
		}
	};

	// Function typically used for a "Clear Cart" button by the user
	// Clears data AND resets flags
	function clearCart() {
		_clearCartData(); // Use the data clearing function
		// Explicitly reset flags here too, as this is a direct user action to reset
		setOrderSent(false);
		setHasError(false);
	}

	// Deletes an item, uses internal setter but also resets flags
	function deleteFromCart(id) {
		_setCart((prevCart) => {
			const newCart = prevCart.filter((item) => item.id !== id);
			// Reset flags immediately if deleting after order attempt
			if (orderSent || hasError) {
				setOrderSent(false);
				setHasError(false);
			}
			return newCart;
		});
	}

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const getBodyElement = document.querySelector("body");
		if (isCartOpen) getBodyElement.style.overflow = "hidden";
		else getBodyElement.style.overflow = "auto";
	}, [isCartOpen, mounted]);

	useEffect(() => {
		if (!mounted) return;

		// Save to localStorage
		if (isLoading) return;
		try {
			if (cart && cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
			else if (cart && cart.length === 0) localStorage.removeItem("cart");
		} catch (error) {
			console.error("Failed to save cart:", error);
		}
	}, [cart, isLoading, mounted]);

	useEffect(() => {
		if (!mounted) return;

		setIsLoading(true);
		try {
			const storedCart = localStorage.getItem("cart");
			if (storedCart) _setCart(JSON.parse(storedCart));
		} catch (error) {
			console.error("Failed to load cart:", error);
			localStorage.removeItem("cart");
		} finally {
			setIsLoading(false);
		}
	}, [mounted]);

	useEffect(() => {
		// Sync order.products
		if (JSON.stringify(order.products) !== JSON.stringify(cart)) {
			setOrder((prevOrder) => ({ ...prevOrder, products: cart || [] }));
		}
	}, [cart]);

	const value = {
		cart,
		setCart,
		clearCart,
		_clearCartData,
		deleteFromCart,
		showContactForm,
		setShowContactForm,
		orderSent,
		setOrderSent,
		setCartOpen,
		isCartOpen,
		setHasError,
		hasError,
		order,
		setOrder,
		isOrderSending,
		setIsOrderSending,
	};

	return (
		<CartContext.Provider value={value} suppressHydrationWarning={true}>
			{children}
		</CartContext.Provider>
	);
}

export default CartProvider;
