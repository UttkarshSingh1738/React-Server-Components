import { useNavigate, useLocation } from "react-router-dom";

type NavigateFunction = (path?: string) => void;

const CustomNavigate = (): NavigateFunction => {
	const navigate = useNavigate();
	const location = useLocation();

	const saveCurrentRoute = (currentPath: string) => {
		const path = window.location.href;
		console.log("path", JSON.stringify(path));
		window.parent.postMessage({ type: "iframePath-payments", value: path }, "*");
	};

	const navigateAndSave: NavigateFunction = (path) => {
		if (path) {
			navigate(path);
			window.history.pushState(null, "", `#${path}`);
			saveCurrentRoute(location.pathname);
		}
	};

	return navigateAndSave;
};

export default CustomNavigate;
