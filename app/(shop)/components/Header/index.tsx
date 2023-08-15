import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-lime-100 px-4 border-b border-black sm:px-8 md:px-40 py-12 font-body">
			<div className="flex justify-between mb-10">
				<div className="flex">
					<div className="pr-4">
						<a href="#">
							<Image src="/img/icon-facebook.svg" alt="Facebook" width={24} height={24} />
						</a>
					</div>

					<div>
						<a href="#">
							<Image src="/img/icon-instagram.svg" alt="Instagram" width={24} height={24} />
						</a>
					</div>
				</div>

				<div>
					<Image src="/img/hdpd-logo.png" alt="Logo" width={167} height={141} />
				</div>

				<div>
					<Link href="/cabaz">
						<Image src="/img/icon-basket.png" alt="Basket" width={24} height={24} />
					</Link>
				</div>
			</div>

			<div className="text-center">
				<p>Levantamento do cabaz na horta entre as 11h e as 13h e entregas na quarta-feira</p>
				<p>Qualquer duvida ligar ou Whatsapp: 999 999 9999</p>
			</div>
		</header>
	);
};

export default Header;
