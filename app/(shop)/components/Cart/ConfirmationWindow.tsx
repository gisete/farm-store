import Image from "next/image";

const ConfirmationWindow = ({ orderSent }) => {
	return (
		<div className="z-20 pt-20 ">
			<div className="text-center mt-6 flex items-center flex-col">
				<Image src="/img/thumbs-up.png" width={80} height={80} alt="" />
				<h4 className="text-3xl text-lime-500 font-bold mb-4 mt-4">Sucesso!</h4>
				<p className="">A encomenda foi enviada</p>
			</div>
		</div>
	);
};

export default ConfirmationWindow;
