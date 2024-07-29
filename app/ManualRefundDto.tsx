export interface ManualRefundDto {
  id?: number;
  userId?: number;
  amount?: number;
  productType?: string;
  productId?: number;
  transactionRef?: string;
  type?: string;
  customerName?: string;
  customerAccountNumber?: string;
  customerIfscCode?: string;
  customerBankName?: string;
  transferAccountName?: string;
  transferAccountNumber?: string;
  transferIfscCode?: string;
  transferBankName?: string;
  transferDate?: string;
  transferUtr?: string;
  metadata?: any;
  status?: ManualRefundStatus;
}
export enum ManualRefundStatus {
  DATA_PENDING,
  TRANSFER_PENDING,
  TRANSFERRED,
  VERIFICATION_PENDING,
  FAILED,
}
export const enumToString = (status: ManualRefundStatus): string => {
  switch (status) {
    case ManualRefundStatus.DATA_PENDING:
      return "DATA_PENDING";
    case ManualRefundStatus.TRANSFER_PENDING:
      return "TRANSFER_PENDING";
    case ManualRefundStatus.TRANSFERRED:
      return "TRANSFERRED";
    case ManualRefundStatus.VERIFICATION_PENDING:
      return "VERIFICATION_PENDING";
    case ManualRefundStatus.FAILED:
      return "FAILED";
    default:
      return "";
  }
};

export const compareStatus = (
  status1: ManualRefundStatus,
  status2: ManualRefundStatus
): boolean => {
  const ans = enumToString(status1) == enumToString(status2);
  console.log(`values is ${ans}`);
  return ans;
};
