import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export const get = async <T = any, R = AxiosResponse<T>, D = any>(
	url: string,
	config?: AxiosRequestConfig<D>
): Promise<R> => {
	// config = getConfig(config);
	return axios.get(url, config);
};

export const post = async <T = any, R = AxiosResponse<T>, D = any>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig<D>
): Promise<R> => {
	// config = getConfig(config);
	return axios.post(url, data, config);
};

export const put = async <T = any, R = AxiosResponse<T>, D = any>(
	url: string,
	data?: D,
	config?: AxiosRequestConfig<D>
): Promise<R> => {
	// config = getConfig(config);
	return axios.put(url, data, config);
};

const getConfig = <D = any,>(
	config?: AxiosRequestConfig<D>
): AxiosRequestConfig<D> => {
	const accessToken: string = getAccessToken();
	let decodedToken;
	let email;
	if (accessToken !== undefined) {
		decodedToken = jwtDecode(accessToken as string);
		email = decodedToken.sub;
	}
	return {
		...config,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			supportUser: email,
			...config?.headers,
		},
	};
};

const getAccessToken = (): string => {
	var accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	if (accessToken == null) {
		throw new Error("Access token not found.");
	}
	if (refreshToken == null) {
		throw new Error("Refresh token not found.");
	}
	return accessToken;
};

export const getError = (error: any, message: string): Error => {
	if (
		error.name === "AxiosError" &&
		error.response?.data?.errorType === "EXPIRED_TOKEN" &&
		error.response?.status == 401
	) {
		return new Error(" Session Expired : Please Login again");
	} else if (error.name === "AxiosError" && error.response?.status == 400) {
		return new Error(error.response.data.message);
	} else {
		return new Error(message + error);
	}
};
