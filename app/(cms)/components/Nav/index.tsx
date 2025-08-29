import Image from "next/image";
import Link from "next/link";

const Nav = () => {
	return (
		<div className="mt-16">
			<ul className="space-y-3 font-medium">
				<li>
					<Link
						href="/admin"
						className="flex items-center pl-2 text-gray-900 rounded-lg dark:text-white hover:text-green-700 transition-colors group"
					>
						<Image src="/img/grid-icon.svg" alt="Logo" width="16" height="16" />
						<span className="ml-3">Products</span>
					</Link>
				</li>
				<li>
					<Link
						href="/admin/add-product"
						className="flex items-center pl-2 text-gray-900 rounded-lg dark:text-white hover:text-green-700 transition-colors group"
					>
						<Image src="/img/plus-icon.svg" alt="Logo" width="16" height="16" />
						<span className="ml-3">Add Product</span>
					</Link>
				</li>
				<li>
					<Link
						href="/admin/categories"
						className="flex items-center pl-2 text-gray-900 rounded-lg dark:text-white hover:text-green-700 transition-colors group"
					>
						<Image src="/img/tag-icon.svg" alt="Logo" width="16" height="16" />
						<span className="ml-3">Categories</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Nav;
