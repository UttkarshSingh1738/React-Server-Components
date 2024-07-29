import { AxiosResponse } from "axios";
import { get, getError, post, put } from "./APIRequestHandler";
import { RefundTransactionDto } from "./RefundTransactionDto";

const findByStatusUrl = (status: string): string =>
  getURL("/refund_transaction/refundshow/" + status);
const findByFieldUrl = (): string => getURL("/refund_transaction/queryByField");
const findByTypeAndIdUrl = (type: string, id: number): string =>
  getURL("/refund_transaction/refundbuild/" + type + "/" + id);

const updateStatusByActionUrl = (status: string, id: number): string =>
  getURL("/refund_transaction/" + id + "/" + status);

const getDeclineUrl = () => {
  return getURL("/refund_transaction/decline");
};
const getURL = (url: string): string => {
  return process.env.REACT_APP_PAYMENTS_BACKEND + url;
};

export const findByStatus = async (
  status: string
): Promise<RefundTransactionDto[]> => {
  try {
    const response = await get(findByStatusUrl(status));

    if (response.status === 200) {
      const data = response.data;
      console.log(response.data);
      return data;
    } else {
      throw new Error("Error fetching users. code : " + response.status);
    }
  } catch (error) {
    throw getError(error, "Error fetching users: ");
  }
};

export const findByField = async (
  payload: any
): Promise<RefundTransactionDto[]> => {
  try {
    const response = await post(findByFieldUrl(), payload);

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error("Error fetching users. code : " + response.status);
    }
  } catch (error) {
    throw getError(error, "Error fetching users: ");
  }
};

export const findByTypeAndId = async <T,>(
  type: string,
  id: number
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await get(findByTypeAndIdUrl(type, id));

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

export const updateStatusByAction = async (
  status: string,
  id: number
): Promise<String> => {
  try {
    const response = await put(updateStatusByActionUrl(status, id));

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error("Error fetching users. code : " + response.status);
    }
  } catch (error) {
    throw getError(error, "Error fetching users: ");
  }
};

export const declineRefund = async (payload:any): Promise<String> => {
  try {
    const response = await put(getDeclineUrl(),payload);

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error("Error fetching users. code : " + response.status);
    }
  } catch (error) {
    throw getError(error, "Error fetching users: ");
  }
};
