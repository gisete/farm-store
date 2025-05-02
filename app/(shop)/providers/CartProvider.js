"use client";
import { createContext, useState, useEffect } from "react";

// Create the context for the cart
export const CartContext = createContext();

// Provider component to manage cart state and logic
function CartProvider({ children }) {
	// Internal state for the cart items
	const [cart, _setCart] = useState([]);
	// State to prevent saving to localStorage before initial load is complete
	const [isLoading, setIsLoading] = useState(true);
	// State for managing order/contact form visibility
	const [showContactForm, setShowContactForm] = useState(false);
	// State flags for order submission status
	const [orderSent, setOrderSent] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isOrderSending, setIsOrderSending] = useState(false);
	// State for cart visibility (mobile)
	const [isCartOpen, setCartOpen] = useState(false);
	// State object holding the current order details
	const [order, setOrder] = useState({
		name: "",
		phone: "",
		comment: "",
		products: [], // Start with empty products, synced via useEffect
	});

	// Wrapper for the internal _setCart function.
	// Resets orderSent/hasError flags when cart is modified after an order attempt.
	const setCart = (newCartDataOrCallback) => {
		if (orderSent || hasError) {
			setOrderSent(false);
			setHasError(false);
		}
		// Supports standard state setting or functional updates
		if (typeof newCartDataOrCallback === "function") {
			_setCart(newCartDataOrCallback);
		} else {
			_setCart(newCartDataOrCallback);
		}
	};

	// Clears the cart and resets order status flags
	function clearCart() {
		setCart([]); // Use wrapper, which calls _setCart
		// Order flags reset within setCart wrapper or explicitly below is fine too
		setOrderSent(false);
		setHasError(false);
		// localStorage is cleared by the saving useEffect when cart becomes []
	}

	// Deletes an item from the cart by its ID
	function deleteFromCart(id) {
		// Use functional update with internal setter for atomicity
		_setCart((prevCart) => {
			const newCart = prevCart.filter((item) => item.id !== id);
			// Reset flags if cart is modified after order attempt
			if (orderSent || hasError) {
				setOrderSent(false);
				setHasError(false);
			}
			return newCart; // Return the new cart state
		});
	}

	// Effect to manage body scroll lock when mobile cart overlay is open
	useEffect(() => {
		const getBodyElement = document.querySelector("body");
		if (isCartOpen) {
			getBodyElement.style.overflow = "hidden";
		} else {
			getBodyElement.style.overflow = "auto";
		}
	}, [isCartOpen]);

	// Effect for SAVING cart state to localStorage whenever 'cart' state changes.
	// Avoids saving until initial loading is finished.
	useEffect(() => {
		// Don't save during initial load phase
		if (isLoading) {
			return;
		}
		try {
			if (cart && cart.length > 0) {
				localStorage.setItem("cart", JSON.stringify(cart));
			} else if (cart && cart.length === 0) {
				// Clear localStorage if cart becomes empty post-load
				localStorage.removeItem("cart");
			}
		} catch (error) {
			console.error("Failed to save cart to localStorage:", error);
		}
	}, [cart, isLoading]); // Run when cart or isLoading changes

	// Effect for LOADING cart state from localStorage on initial component mount.
	useEffect(() => {
		setIsLoading(true); // Ensure loading state is true initially
		try {
			const storedCart = localStorage.getItem("cart");
			if (storedCart) {
				const parsedCart = JSON.parse(storedCart);
				_setCart(parsedCart); // Load data using internal setter
			}
		} catch (error) {
			console.error("Failed to load cart from localStorage:", error);
			localStorage.removeItem("cart"); // Clear potentially corrupted item
		} finally {
			// Mark loading as complete regardless of success/failure
			setIsLoading(false);
		}
	}, []); // Empty dependency array: runs only once on mount

	// Effect to keep the 'order.products' field in sync with the main cart state.
	useEffect(() => {
		// Avoid unnecessary updates if cart reference hasn't changed content meaningfully
		if (JSON.stringify(order.products) !== JSON.stringify(cart)) {
			setOrder((prevOrder) => ({
				...prevOrder,
				products: cart || [], // Ensure products is always an array
			}));
		}
	}, [cart]); // Run when cart state changes

	// Construct the value object provided by the context
	const value = {
		cart,
		setCart, // Provide the wrapper function
		clearCart,
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

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
