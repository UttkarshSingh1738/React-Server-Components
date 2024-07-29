import React from "react";
import "./styles/Card.css";

type CardProps = {
	image: string;
	heading: string;
	details: string;
	handleOnClick: (params: any) => any;
};

function Card({
								image,
								heading,
								details,
								handleOnClick,
							}: CardProps) {
	return (
		<div className="home-card-block" onClick={handleOnClick} data-heading={heading}>
			<div className="d-flex justify-content-center">
				<img className="home-card-icon" src={image} alt="card-icon"></img>
			</div>
			<div className="row">
				<p className="card-heading">{heading}</p>
			</div>
			<div className="row">
				<p className="card-details">{details}</p>
			</div>
		</div>
	);
}

export default Card;
