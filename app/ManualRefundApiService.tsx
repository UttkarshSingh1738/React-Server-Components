import { get, getError, post, put } from "./APIRequestHandler.tsx";
import { enumToString } from "./ManualRefundDto.tsx";
import { ManualRefundStatus } from "./ManualRefundDto.tsx";
import { ManualRefundDto } from "./ManualRefundDto.tsx";
import { SupportTask } from "./SupportTaskDto.tsx";

const createRefundUrl = (): string => getURL("/refund/manual");
const findbyIdUrl = (id: number): string => getURL("/refund/manual/" + id);
const findByStatusUrl = (status: string): string =>
  getURL("/refund/manual/fetchByStatus/" + status);
const findSupportTaskByIdUrl = (id: number): string =>
  getURL("/refund/manual/" + id + "/supportTasks");
const updateCustomerDetailUrl = (id: number): string =>
  getURL("/refund/manual/" + id + "/updateCustomerDetail");
const updateTransactionDetailUrl = (id: number): string =>
  getURL("/refund/manual/" + id + "/updateTransactionDetail");
const verifyUrl = (id: number): string =>
  getURL("/refund/manual/" + id + "/verify");

const getURL = (url: string): string => {
  return process.env.REACT_APP_PAYMENTS_BACKEND + url;
};

export const findById = async (id: number): Promise<ManualRefundDto> => {
  try {
    const response = await get(findbyIdUrl(id));

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

export const findByStatus = async (
  status: ManualRefundStatus
): Promise<ManualRefundDto[]> => {
  try {
    const response = await get(findByStatusUrl(enumToString(status)));

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

export const findSupportTaskById = async (
  id: number
): Promise<SupportTask[]> => {
  try {
    const response = await get(findSupportTaskByIdUrl(id));

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

export const updateCustomerDetail = async (
  id: number,
  data: ManualRefundDto
): Promise<ManualRefundDto> => {
  try {
    const response = await put(updateCustomerDetailUrl(id), data);

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

export const updateTransactionDetail = async (
  id: number,
  data: ManualRefundDto
): Promise<ManualRefundDto> => {
  try {
    const response = await put(updateTransactionDetailUrl(id), data);

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

export const verifyDetails = async (
  id: number,
  data: ManualRefundDto
): Promise<ManualRefundDto> => {
  try {
    const response = await put(verifyUrl(id), data);

    if (response.status === 200) {
      const data = response.data;
      console.log(response.data);
      return data;
    } else {
      throw new Error("Error verifying datas. code : " + response.status);
    }
  } catch (error) {
    throw getError(error, "Error verifying data: ");
  }
};

export const createManualRefund = async (
  data: ManualRefundDto
): Promise<ManualRefundDto> => {
  try {
    const response = await post(createRefundUrl(), data);

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
