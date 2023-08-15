import Image from "next/image";
import Link from "next/link";

const Nav = () => {
	return (
		<div className="mt-16">
			<ul className="space-y-2 font-medium">
				<li>
					<Link
						href="/admin"
						className="flex items-center p-2 pb-0 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<Image src="/img/grid-icon.svg" alt="Logo" width="16" height="16" />
						<span className="ml-3">Products</span>
					</Link>
				</li>
				<li>
					<Link
						href="/admin/add-product"
						className="flex items-center p-2 pb-0 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pl-12"
					>
						Add Product
					</Link>
				</li>
				<li>
					<Link
						href="/admin/categories"
						className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group pl-12"
					>
						Categories
					</Link>
				</li>
				<li>
					<Link
						href="/admin/orders"
						className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
					>
						<Image src="/img/icon-shopping-bag.svg" alt="Logo" width="16" height="16" />
						<span className="ml-3">Orders</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
