import React from "react";
import HomePageCardComponent from "./HomePageCardComponent";
import { cardData } from "./CardData";

function Home() {
	const allowerdCardList = ([
		cardData["Refunds"],
		cardData["Routing"]
	]);

	return (
		<div>
			<HomePageCardComponent
				cardDataList={allowerdCardList}
				headerString={" Payments "}/>
		</div>
	);
}

export default Home;