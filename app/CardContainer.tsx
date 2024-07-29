'use client';

import { CardView } from "./CardData";
// import CustomNavigate from "./CustomNavigate";
import Card from "./Card";
import "./styles/CardContainer.css"
import React from "react";

interface CardContainerProps {
	cardDataList: CardView[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardDataList }) => {
	// const navigate = CustomNavigate();
	return (
		<div className="card-grid-container">
			{cardDataList.map((cardData, index) => (
				<Card
					key={cardData.heading}
					image={cardData.image}
					heading={cardData.heading}
					details={cardData.details}
					// handleOnClick={() => navigate(cardData.navigateTo)}/>
					handleOnClick={() => cardData.navigateTo}/>
				))}
		</div>
	);
};

export default CardContainer;
