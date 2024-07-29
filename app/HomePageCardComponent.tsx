import React from "react";
import "./styles/Home.css";
import { CardView } from "./CardData";
// @ts-ignore
import CardContainer from "./CardContainer.tsx";

interface HomePageProps {
	cardDataList: CardView[];
	headerString: string;
}

const HomePageCardComponent: React.FC<HomePageProps> = ({
																													cardDataList,
																													headerString,
																												}) => {
	return (
		<div>
			<div className="home">
				<div className="homeHeader">
					<span style={{color: "#828282"}}>Welcome to</span>
					<span style={{color: "#212121"}}>{headerString}</span>
				</div>
				<CardContainer cardDataList={cardDataList}/>
			</div>
		</div>
	);
};

export default HomePageCardComponent;