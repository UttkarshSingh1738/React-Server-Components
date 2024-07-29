// import ManualRefundIcon from "./images/manual_refund.svg";
// import TxnRefundIcon from "./images/transaction_refund.svg";
// import RefundMgmtIcon from "./images/refund_management.svg";
// import Routing from "./images/routing.svg";

export interface CardView {
	heading: string;
	image: string;
	details: string;
	navigateTo: string;
}

export const cardData: { [key: string]: CardView } = {
	ManualRefunds: {
		heading: "Manual Refunds",
		// image: ManualRefundIcon,
		image: "./images/manual_refund.svg",
		details: "This is a dummy text to explain this scenario",
		navigateTo: "/manualRefund",
	},
	Refunds: {
		heading: "Refund Management",
		// image: RefundMgmtIcon,
		image: "./images/refund_management.svg",
		// "https://smartcoin.co.in/images/app/admin_ui/images/ageny-home-card/Hat.png",
		details: "This is a dummy text to explain this scenario",
		navigateTo: "/refunds",
	},
	RefundTransactions: {
		heading: "Refunds Transactions",
		// image: TxnRefundIcon,
		image: "./images/refund_management.svg",
		details: "This is a dummy text to explain this scenario",
		navigateTo: "/refundTransaction",
	},
	Routing: {
		heading: "Routing Management",
		// image: Routing,
		image: "./images/routing.svg",
		// "https://smartcoin.co.in/images/app/admin_ui/images/ageny-home-card/Hat.png",
		details: "Contains view and actions related to Routing  ",
		navigateTo: "/routing_view",
	},
};

// export default cardData;