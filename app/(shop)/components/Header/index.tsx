import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-lime-100 px-4 border-b border-black sm:px-8 md:px-40 py-12 font-body">
			<div className="mb-2">
				<div className="text-center">
					<h1 className="text-xl">Pedidos da Horta</h1>
				</div>
			</div>
		</header>
	);
};

export default Header;
