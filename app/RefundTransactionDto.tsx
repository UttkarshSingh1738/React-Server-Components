export interface RefundTransactionDto {
  remoteId: number;
  id: number;
  userId?: number | null;
  refundId?: string | null;
  amount?: number | null;
  pgAccountId?: number | null;
  paymentId?: string | null;
  status?: string | null;
  refundCreationDate?: Date | null;
  refundType?: string | null;
  errorCode?: string | null;
  errorDescription?: string | null;
  errorSource?: string | null;
  errorStep?: string | null;
  errorReason?: string | null;
  createdAt: Date;
  updatedAt: Date;
  stage?: string | null;
  approvedOn?: Date | null;
  utr?: string | null;
  arn?: string | null;
  rrn?: string | null;
  acquirerData?: string | null;
}

export const compareRefundStatus = (
  status: String | null | undefined,
  checkStatus: String[]
): Boolean => {
  if(status == null || status == undefined){
    return false;
  }
  return checkStatus.includes(status);
};
