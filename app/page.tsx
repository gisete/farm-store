import Image from "next/image";
import Products from "./(shop)/components/Products";

export default function Home() {
	return (
		<div className="flex flex-col w-full h-full px-4 py-12 overflow-y-auto">
			<Image src="/img/hdpd-logo.png" alt="Logo" width="100" height="100" className="self-center" />
		</div>
	);
}
