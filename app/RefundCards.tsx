import React from 'react';
import { CardView, cardData } from "./CardData";
// @ts-ignore
import CardContainer from "./CardContainer.tsx";
// import CustomNavigate from "./CustomNavigate";
// import BreadcrumbsLinks from "./BreadcrumbsLinks";

function RefundCards() {
	const allowerdCardList = [
		cardData["ManualRefunds"],
		cardData["RefundTransactions"],
	];

	// const prevLabel = [{ label: "Home", url: "/" }];

	// const navigate = CustomNavigate();
	// const handleBreadClick = () => {
	// 	navigate("/");
	// };

	return (
		<div>
			{/*<div className="row">*/}
			{/*	<BreadcrumbsLinks*/}
			{/*		prevLabel={prevLabel}*/}
			{/*		currentLabel="Refund Management"*/}
			{/*		onClick={handleBreadClick}*/}
			{/*	/>*/}
			{/*</div>*/}
			<div className="row">
				<CardContainer cardDataList={allowerdCardList} />
			</div>
		</div>
	);
}

export default RefundCards;
