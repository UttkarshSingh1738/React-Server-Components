export interface RefundTransactionInfo {
  payment: Payment[];
  userLoan: UserLoan[];
  inappTransaction: InappTransaction[];
  paymentSettlements: PaymentSettlement[];
  distributions: PaymentDistribution[];
}

interface Payment {
  remoteId: number;
  userId: number;
  userLoanId: number;
  status: string;
  amount: number;
  overDue: number;
  penalty: number;
  paymentDeadline: string;
  paymentDate: string;
  createdAt: string;
}
interface UserLoan {
  remoteId: number;
  userId: number;
  lenderId: number;
  amount: number;
  status: string;
  disbursedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface InappTransaction {
  remoteId: number;
  lenderId: number;
  pgAccountId: number;
  userId: number;
  userPaymentId: number;
  thirdPartyTransactionId: number;
  amount: number;
  status: string;
  transactionAuthorizationDate: string;
  paymentMode: string;
  transferId: number;
  validationStatus: string;
  refundAmount: number;
  customerOrderId: number;
  createdAt: string;
  updatedAt: string;
}
export interface PaymentSettlement {
  remoteId: number;
  paymentRef: string;
  paymentId: number;
  amount: number;
  status: string;
  mode: string;
  upiId: string;
  paymentDeadline: string;
  createdAt: string;
}

interface PaymentDistribution {
  remoteId: number;
  paymentSettlementId: number;
  paymentId: number;
  amount: number;
  principalAmount: number;
  interestAmount: number;
  updatedAt: string;
  createdAt: string;
}

export const paymentDistributionColumns = [
  { key: "remoteId", label: "ID", sortable: true },
  {
    key: "paymentSettlementId",
    label: "Payment Settlement ID",
    sortable: true,
  },
  { key: "paymentId", label: "Payment ID", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "principalAmount", label: "Principal Amount", sortable: true },
  { key: "interestAmount", label: "Interest Amount", sortable: true },
  { key: "updatedAt", label: "Updated At", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
];

export const paymentSettlementColumns = [
  { key: "remoteId", label: "ID", sortable: true },
  { key: "paymentRef", label: "Payment Reference", sortable: true },
  { key: "paymentId", label: "Payment ID", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "mode", label: "Mode", sortable: true },
  { key: "upiId", label: "UPI ID", sortable: true },
  { key: "paymentDeadline", label: "Payment Deadline", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
];

export const inappTransactionColumns = [
  { key: "remoteId", label: "ID", sortable: true },
  { key: "lenderId", label: "Lender ID", sortable: true },
  { key: "pgAccountId", label: "PG Account ID", sortable: true },
  { key: "userId", label: "User ID", sortable: true },
  { key: "userPaymentId", label: "User Payment ID", sortable: true },
  {
    key: "thirdPartyTransactionId",
    label: "Third Party Transaction ID",
    sortable: true,
  },
  { key: "amount", label: "Amount", sortable: true },
  { key: "status", label: "Status", sortable: true },
  {
    key: "transactionAuthorizationDate",
    label: "Transaction Authorization Date",
    sortable: true,
  },
  { key: "paymentMode", label: "Payment Mode", sortable: true },
  { key: "transferId", label: "Transfer ID", sortable: true },
  { key: "validationStatus", label: "Validation Status", sortable: true },
  { key: "refundAmount", label: "Refund Amount", sortable: true },
  { key: "customerOrderId", label: "Customer Order ID", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
  { key: "updatedAt", label: "Updated At", sortable: true },
];

export const userLoanColumns = [
  { key: "remoteId", label: "ID", sortable: true },
  { key: "userId", label: "User ID", sortable: true },
  { key: "lenderId", label: "Lender ID", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "disbursedAt", label: "Disbursed At", sortable: true },
  { key: "updatedAt", label: "Updated At", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
];

export const paymentColumns = [
  { key: "remoteId", label: "ID", sortable: true },
  { key: "userId", label: "User ID", sortable: true },
  { key: "userLoanId", label: "User Loan ID", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "overDue", label: "Overdue", sortable: true },
  { key: "penalty", label: "Penalty", sortable: true },
  { key: "paymentDeadline", label: "Payment Deadline", sortable: true },
  { key: "paymentDate", label: "Payment Date", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true },
];
