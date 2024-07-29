import React from "react";
import Lottie from 'react-lottie-player'
import lottieJson from "./images/lottie/loader-lottie.json"


const LottieLoadingSection = () => {
	return (
		<div className="table-container table-stack d-flex flex-column align-items-center justify-content-center">
			<div>
				<Lottie
					loop
					animationData={lottieJson}
					play
					style={{ width: 600, height: 200 }}
				/>
			</div>
		</div>
	);
};

export default LottieLoadingSection;
