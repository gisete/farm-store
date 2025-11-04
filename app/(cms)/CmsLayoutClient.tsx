"use client";

import type React from "react";
import SidePanel from "./components/SidePanel";
import LogoutButton from "./components/LogoutButton";
import Notification from "./components/Notification";

/**
 * Client Component: Admin CMS Layout UI
 *
 * This component handles the UI rendering for the admin panel.
 * Authentication is already verified on the server before this component renders.
 *
 * @param children - Child components to render in the main content area
 */
interface CmsLayoutClientProps {
	children: React.ReactNode;
}

export default function CmsLayoutClient({ children }: CmsLayoutClientProps) {
	return (
		<div className="bg-[#fbf8f3]">
			<LogoutButton />
			<div className="flex">
				<aside className="w-64 min-h-lvh h-full">
					<SidePanel />
				</aside>
				<main className="min-h-lvh h-full flex-1 pb-8 pr-8">
					<Notification />
					<div className="bg-white min-h-full px-12 py-16">{children}</div>
				</main>
			</div>
		</div>
	);
}
