export type LenderDto = {
	lenderName: string;
	lenderId: string;
};

export interface getOptionsResponse {
	lenderDto: LenderDto[];
	stages: string[];
}

export interface OptionType {
	value: string;
	label: string;
}