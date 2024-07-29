import React from "react";
import { GlobalModal } from "@smartcoin/global-components-typescript";
import { ManualRefundStatus } from "./ManualRefundDto.tsx";
import { ManualRefundDto } from "./ManualRefundDto.tsx";
import { useState } from "react";
import {
  updateCustomerDetail,
  updateTransactionDetail,
  verifyDetails,
} from "./ManualRefundApiService.tsx";
import { errorToast } from "./CustomToast.tsx";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "./styles/ManualRefundStyles.css";

interface UpdateRefundProps {
  type: string;
  state: boolean;
  handleClose: () => void;
  initRefund: ManualRefundDto;
}

function UpdateRefund({
  type,
  state,
  handleClose,
  initRefund,
}: UpdateRefundProps) {
  const [refund, setRefund] = useState<ManualRefundDto>(initRefund);
  const [failureReason, setFailureReason] = useState<string>("");

  const handleSave = () => {
    switch (type) {
      case "CustomerDetailsUpdate":
        refund.status = ManualRefundStatus.VERIFICATION_PENDING;
        updateCustomerDetail(refund.id as number, refund).catch((error) =>
          errorToast(error)
        );
        break;
      case "TransferDetailsUpdate":
        refund.status = ManualRefundStatus.TRANSFERRED;
        updateTransactionDetail(refund.id as number, refund).catch((error) =>
          errorToast(error)
        );
        break;
      case "FailTransaction":
        refund.status = ManualRefundStatus.FAILED;
        updateTransactionDetail(refund.id as number, refund).catch((error) =>
          errorToast(error)
        );
        break;
      case "VerifyDetails":
        refund.status = ManualRefundStatus.TRANSFER_PENDING;
        verifyDetails(refund.id as number, refund).catch((error) =>
          errorToast(error)
        );
        break;
    }
    handleClose();
  };

  const getTitle = () => {
    switch (type) {
      case "RefundDetailsUpdate":
        return "Update Refund Details";
      case "CustomerDetailsUpdate":
        return "Update Customer Details";
      case "TransferDetailsUpdate":
        return "Update Transfer Details";
      case "FailTransaction":
        return "Fail Transaction";
      case "VerifyDetails":
        return "Verify Details";
    }
  };

  const [, setRefreshFlag] = useState(false);
  const refreshContainer = () => {
    // Toggle the refreshFlag to trigger a re-render
    setRefreshFlag((prevRefreshFlag) => !prevRefreshFlag);
  };

  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleDateChange = (date: any) => {
    console.log(date);
    refund.transferDate =
      date == null ? undefined : format(date, "yyyy-MM-dd HH:mm:ss");
    setRefund(refund);
    refreshContainer();
    // setStartDate(date);
  };

  const handleChange = (event: any) => {
    if (refund == null) {
      return;
    }
    switch (event.target.id) {
      //Refund Txn Details
      case "userId":
        refund.userId = event.target.value;
        break;
      case "amount":
        refund.amount = event.target.value;
        break;
      case "userLoanId":
        refund.productId = event.target.value;
        break;
      case "paymentRef":
        refund.transactionRef = event.target.value;
        break;

      // Customer Details
      case "customerName":
        refund.customerName = event.target.value;
        break;
      case "customerAccountNumber":
        refund.customerAccountNumber = event.target.value;
        break;
      case "customerIfsc":
        refund.customerIfscCode = event.target.value;
        break;
      case "customerBankName":
        refund.customerBankName = event.target.value;
        break;

      // Transfer Details
      case "transferDate":
        refund.transferDate = event.target.value;
        break;
      case "transferAccountName":
        refund.transferAccountName = event.target.value;
        break;
      case "transferAccountNumber":
        refund.transferAccountNumber = event.target.value;
        break;
      case "transferIfscCode":
        refund.transferIfscCode = event.target.value;
        break;
      case "transferBankName":
        refund.transferBankName = event.target.value;
        break;
      case "transferUtr":
        refund.transferUtr = event.target.value;
        break;
      case "failureReason":
        if (!refund.metadata) refund.metadata = {};
        setFailureReason(event.target.value);
        refund.metadata["failureReason"] = event.target.value;
        break;
    }
    setRefund(refund);
    refreshContainer();
  };

  return (
    <div className="customModalHeight">
      <GlobalModal
        show={state}
        onClose={handleClose}
        onSave={handleSave}
        saveButtonText="Update"
        title={getTitle()}
      >
        {/* Update Refund Details */}
        {"RefundDetailsUpdate" == type && (
          <div className="details-container p-3">
            <p className="mt-3 mb-1">User Id:</p>
            <input
              type="text"
              id="userId"
              value={refund.userId}
              onChange={handleChange}
              className="inputTag"
              required
            />
            <p className="mt-3 mb-1">Loan Id:</p>
            <input
              type="text"
              id="userLoanId"
              value={refund.productId}
              onChange={handleChange}
              className="inputTag"
              required
            />
            <p className="mt-3 mb-1">Payment Ref:</p>
            <input
              type="text"
              id="paymentRef"
              value={refund.transactionRef}
              onChange={handleChange}
              className="inputTag"
              required
            />
            <p className="mt-3 mb-1">Amount:</p>
            <input
              type="text"
              id="amount"
              value={refund.amount}
              onChange={handleChange}
              className="inputTag"
              required
            />
          </div>
        )}

        {/* Update Cuctomer Details */}
        {"CustomerDetailsUpdate" == type && (
          <div className="details-container p-3">
            <p className="mt-3 mb-1">Name:</p>
            <input
              type="text"
              id="customerName"
              value={refund.customerName}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Account Number:</p>
            <input
              type="text"
              id="customerAccountNumber"
              value={refund.customerAccountNumber}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Bank Ifsc:</p>
            <input
              type="text"
              id="customerIfsc"
              value={refund.customerIfscCode}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Bank Name:</p>
            <input
              type="text"
              id="customerBankName"
              value={refund.customerBankName}
              onChange={handleChange}
              className="inputTag"
              required
            />
          </div>
        )}

        {/* Update Transaction Details */}
        {"TransferDetailsUpdate" == type && (
          <div className="details-container p-3">
            <p className="mt-3 mb-1">Transfer Date:</p>
            {/* <input
              type="text"
              id="transferDate"
              value={refund?.transferDate}
              onChange={handleChange}
              className="inputTag"
              required
            /> */}
            <DatePicker
              id="transferDate2"
              showIcon
              selected={
                refund.transferDate == undefined
                  ? undefined
                  : new Date(refund.transferDate)
              }
              onChange={(date) => handleDateChange(date)}
              showTimeSelect
              isClearable
              timeIntervals={1}
              timeFormat="HH:mm:ss"
              dateFormat="yyyy-MM-dd HH:mm"
              // wrapperClassName="inputTag"
            />

            <p className="mt-3 mb-1">Account Name:</p>
            <input
              type="text"
              id="transferAccountName"
              value={refund?.transferAccountName}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Account Number:</p>
            <input
              type="text"
              id="transferAccountNumber"
              value={refund?.transferAccountNumber}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Bank Ifsc:</p>
            <input
              type="text"
              id="transferIfscCode"
              value={refund?.transferIfscCode}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">Bank Name:</p>
            <input
              type="text"
              id="transferBankName"
              value={refund?.transferBankName}
              onChange={handleChange}
              className="inputTag"
              required
            />

            <p className="mt-3 mb-1">UTR:</p>
            <input
              type="text"
              id="transferUtr"
              value={refund?.transferUtr}
              onChange={handleChange}
              className="inputTag"
              required
            />
          </div>
        )}
        {"VerifyDetails" == type && (
          <div className="details-container p-3">Verify Customer Details ?</div>
        )}
        {"FailTransaction" == type && (
          <div className="details-container p-3">
            <p className="mt-3 mb-1">Failure Reason:</p>
            <input
              type="text"
              id="failureReason"
              value={failureReason}
              onChange={handleChange}
              className="inputTag"
              required
            />
          </div>
        )}
      </GlobalModal>
    </div>
  );
}

export default UpdateRefund;
