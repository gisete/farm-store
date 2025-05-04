import Image from "next/image";

const ConfirmationWindow = ({ orderSent, hasError }) => {
	return (
		<div className="z-20 pt-20 ">
			<div className="text-center mt-6 flex items-center flex-col">
				{/* Check if there's an error FIRST */}
				{hasError ? (
					// If hasError is true, show Error message
					<>
						<Image src="/img/thumbs-down.png" width={80} height={80} alt="Erro no envio" />
						<h4 className="text-3xl text-red-500 font-bold mb-4 mt-4">Erro</h4>
						<p className="">Houve um erro ao enviar a encomenda.</p> {/* Corrected typo */}
						<p>Por favor contacte-nos se o problema persistir.</p>
					</>
				) : (
					// Otherwise (if no error), show Success message
					<>
						<Image src="/img/thumbs-up.png" width={80} height={80} alt="Encomenda enviada" />
						<h4 className="text-3xl text-lime-500 font-bold mb-4 mt-4">Sucesso!</h4>
						<p className="">A encomenda foi enviada.</p>
					</>
				)}
			</div>
		</div>
	);
};

export default ConfirmationWindow;
