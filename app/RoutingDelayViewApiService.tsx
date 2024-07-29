import { AxiosResponse } from "axios";
import { get, getError, post } from "./APIRequestHandler";
import {ColumnDescriptor} from "./EntityTable";

const getOptionsType = (): string => getURL("/routing/get_options");
const getRoutingDelayViewUrl = (): string => getURL("/routing/delayView");

export type RoutindDelayViewPayload = {
	lenderId: string;
	stage: string;
};

export interface DelayAmounts {
	[key: number]: number;
}

export type RoutingDelayViewResponse = {
	stage: string;
	lenderId: number;
	pgAccountId: number;
	delayAmounts: DelayAmounts;
};

const getURL = (url: string): string => {
	return "https://qa15-payments.rebase.in" + url;
};
export const getOptionsFromType = async <T,>(): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await get(getOptionsType());

		if (response.status === 200) {
			const data: T = response.data;
			return data;
		} else {
			throw new Error("Error fetching users. code : " + response.status);
		}
	} catch (error) {
		throw getError(error, "Error fetching users: ");
	}
};

export const fetchRoutingDelayView = async <T,>(
	payload: RoutindDelayViewPayload
): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await post(
			getRoutingDelayViewUrl(),
			payload,
			{timeout:300000}
		);

		if (response.status === 200) {
			const data: T = response.data;
			return data;
		} else {
			throw new Error("Error fetching users. code : " + response.status);
		}
	} catch (error) {
		throw getError(error, "Error fetching users: ");
	}
};

export const transformResponseData = (response: RoutingDelayViewResponse[]) => {
	return response.map(item => ({
		...item,
		...item.delayAmounts
	}));
};

export const stageColumnsDescripter = (response: RoutingDelayViewResponse[]) => {
	const columns: ColumnDescriptor[] = [];
	if (response.length > 0) {
		columns.push(
			{ key: "stage", label: "Stage", sortable: true },
			{ key: "lenderId", label: "Lender", sortable: true }
		);
		const delayAmountsKeys = Object.keys(response[0].delayAmounts);
		delayAmountsKeys.forEach(key => {
			const keyExists = columns.some(column => column.key === key);
			if (!keyExists) {
				columns.push({ key: key, label: `>=${key}`, sortable: true });
			}
		});
	}
	return columns;
}
