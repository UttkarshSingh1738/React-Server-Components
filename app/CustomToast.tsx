import { ExternalToast, toast } from "sonner";

const toastConfig = {
	duration: 5000,
	position: "top-center",
};

export const errorToast = (error: any): any => {
	if (error instanceof Error) {
		toast.error(
			`Request got failed due to ${error.message}`,
			toastConfig as ExternalToast
		);
	}
};
