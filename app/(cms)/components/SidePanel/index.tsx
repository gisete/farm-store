import Image from "next/image";
import Nav from "../Nav";

const SidePanel = () => {
	return (
		<div className="flex flex-col h-full px-3 py-12 overflow-y-auto">
			<Image src="/img/hdpd-logo.png" alt="Logo" width="100" height="100" className="self-center" />

			<Nav />
		</div>
	);
};

export default SidePanel;
