'use client';

import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
// import BreadcrumbsLinks from "./BreadcrumbsLinks.tsx";
// import { useNavigate } from "react-router-dom";
import { RoutingDelayViewResponse, getOptionsFromType, fetchRoutingDelayView, transformResponseData, stageColumnsDescripter } from "./RoutingDelayViewApiService";
import { errorToast } from "./CustomToast";
import { getOptionsResponse } from "./RoutingDelayViewData";
import WrapperTable from "./WrapperTable";
// import LottieLoadingSection from "./LottieLoaderSection";
import {GlobalGenericButton} from "@smartcoin/global-components-typescript";
import {ColumnDescriptor} from "./EntityTable";
import "./styles/common-styles.css";
import "./styles/RoutingDelayViewStyles.css"

type Props = {};

const RoutingDelayView = (props: Props) => {
	// const navigate = useNavigate();
	const [,setCategorySelectedItem] = useState("");
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [lender, setLender] = useState<number | undefined>(undefined);
	const [stage,setStage] = useState<string | undefined>(undefined);
	const [isSearching, setIsSearching] = useState(false);

	const [stageData,setStageData] = useState<any[]>([]);
	const [stageTableColums, setStageTableColumns] = useState<ColumnDescriptor[]>([])

	const columns = [
		{ key: "stage", label: "Stage", sortable: true },
		{ key: "amount", label: "Amount", sortable: true },
	];


	const [optionsType, setOptionsType] = useState<
		getOptionsResponse | undefined
	>(undefined);

	// const prevLabel = [
	// 	{ label: "Home", url: "/" }
	// ];
	// const handleBreadClick = () => {
	// 	navigate("/");
	// };

	const handleCategorySelect = (selectedOption: any) => {
		setLoading(true);
		console.log(selectedOption);
		try {
			const payload: any = {
				lenderId: selectedOption.value,
			};
			fetchRoutingDelayView<RoutingDelayViewResponse[]>(payload).then(
				(data) => {
					setData(data);
					setLoading(false);
				}
			);
		} catch (error) {
			errorToast(error);
			setLoading(false);
		}
		setCategorySelectedItem(selectedOption.value);
	};

	const handleLenderSelect = (selectedOption: any) => {
		setLender(selectedOption.value)
	}

	const handleStageSelect = (selectedOption: any) => {
		setStage(selectedOption.value)
	}

	const categoryOptions = optionsType?.lenderDto.map((item) => ({
		value: item.lenderId,
		label: `${item.lenderName} (${item.lenderId})`,
	}));

	const stageOptions = optionsType?.stages.map((item) => ({
		value: item,
		label: item
	}));

	useEffect(() => {
		try {
			getOptionsFromType<getOptionsResponse>().then((data) => {
				setOptionsType(data);
			});
		} catch (error) {
			errorToast(error);
		}
	}, []);

	const handleStageSearchClick = () => {

		setIsSearching(true);
		try {
			const payload: any = {
				lenderId: lender,
				stage : stage
			};
			fetchRoutingDelayView<RoutingDelayViewResponse[]>(payload).then(
				(data) => {
					setStageData(transformResponseData(data));
					setStageTableColumns(stageColumnsDescripter(data));
					setIsSearching(false);
				}
			);
		} catch (error) {
			errorToast(error);
		}
	}


	return (
		<div className="routing_view">
			{/*<BreadcrumbsLinks*/}
			{/*	prevLabel={prevLabel}*/}
			{/*	currentLabel="Routing Delay"*/}
			{/*	onClick={handleBreadClick}*/}
			{/*/>*/}

			<div className="ms-4 mt-3 p-3">
				<p className="page-title-container">Routing Delay</p>
			</div>
			<div className="col-lg-10 border-box mt-3 ms-4">
				<div className="row ms-1">
					<div className="container-fluid search-container-box">
						<div className="row">
							<p className="input-search-container-search-text mb-2">
								Select Lender
							</p>
						</div>
						<div className="row">
							<div className="case-info-dropdown-container col-lg-6 mb-4">
								<div>
									<div className="mt-1 col-lg-6 dropdown-styles">
										<Select
											onChange={handleCategorySelect}
											options={categoryOptions}
											placeholder="Select Lender"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row ms-1 mb-5">
					<div className="container-fluid search-container-box">
						<div className="row">
							{/*{loading ? (*/}
							{/*	<LottieLoadingSection/>*/}
							{/*) : (*/}
								<WrapperTable
									title="Stuck Amount"
									columns={columns}
									data={data}
								/>
							{/*)}*/}
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid border-box col-lg-10 mt-3 ms-4 mb-5">
				<div className="row mb-5">
					<div className="col-lg-4">
						<div className="row">
							<p className="input-search-container-search-text mb-2">
								Select Lender
							</p>
						</div>
						<div className="row">
							<div className="mt-1 col-lg-6 dropdown-styles">
								<Select
									onChange={handleLenderSelect}
									options={categoryOptions}
									placeholder="Select Lender"
								/>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="row">
							<p className="input-search-container-search-text mb-2">
								Select Stage
							</p>
						</div>
						<div className="row">
							<div className="mt-1 col-lg-6 dropdown-styles">
								<Select
									onChange={handleStageSelect}
									options={stageOptions}
									placeholder="Select Stage"
								/>
							</div>
						</div>
					</div>
					<div className="col-lg-2 mt-4">
						<GlobalGenericButton
							label={`${isSearching ? "Searching" : "Search"}`}
							isLoading={isSearching}
							backgroundColor="#468df1"
							textColor="#FFFFFF"
							{...(isSearching ? {} : {onClick: () => handleStageSearchClick()})}
						/>
					</div>
				</div>
				<div className="row">
					{stageData.length > 0 &&
						<WrapperTable
							title="Delay View"
							columns={stageTableColums}
							data={stageData}
						/>
					}
				</div>
			</div>
		</div>
	);
};

export default RoutingDelayView;