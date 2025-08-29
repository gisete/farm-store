// File: app/(cms)/components/Notification/index.tsx
import { Toaster } from "react-hot-toast";

const Notification = () => {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			containerClassName=""
			containerStyle={{}}
			toastOptions={{
				// Define default options for all toasts
				duration: 5000,

				// --- NEW: Improved default styles ---
				style: {
					background: "#ffffff",
					color: "#374151", // Tailwind gray-700
					padding: "16px",
					borderRadius: "8px",
					border: "1px solid #e5e7eb", // Tailwind gray-200
					boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // A more subtle shadow
				},

				// --- NEW: Specific styles for different toast types ---
				success: {
					duration: 3000,
					style: {
						background: "#f0fdf4", // Tailwind green-50
						color: "#166534", // Tailwind green-800
						border: "1px solid #bbf7d0", // Tailwind green-200
					},
					iconTheme: {
						primary: "#22c55e", // Tailwind green-500
						secondary: "#f0fdf4", // Tailwind green-50
					},
				},
				error: {
					style: {
						background: "#fffbeb", // Tailwind yellow-50
						color: "#b45309", // Tailwind yellow-700
						border: "1px solid #fde68a", // Tailwind yellow-200
					},
					iconTheme: {
						primary: "#f59e0b", // Tailwind yellow-500
						secondary: "#fffbeb", // Tailwind yellow-50
					},
				},
			}}
		/>
	);
};

export default Notification;
