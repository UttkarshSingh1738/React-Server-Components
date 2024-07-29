import React from "react";
import { GlobalModal } from "@smartcoin/global-components-typescript";
import { useState } from "react";
import { ManualRefundDto } from "./ManualRefundDto.tsx";
import { createManualRefund } from "./ManualRefundApiService.tsx";
import { errorToast } from "./CustomToast.tsx";

interface CreateRefundProps {
  state: boolean;
  handleClose: () => void;
}

function CreateManualRefund({ state, handleClose }: CreateRefundProps) {
  const [refund, setRefund] = useState<ManualRefundDto>({});

  const handleSave = () => {
    createManualRefund(refund).catch((error) => errorToast(error));
    handleClose();
  };

  const [, setRefreshFlag] = useState(false);
  const refreshContainer = () => {
    // Toggle the refreshFlag to trigger a re-render
    setRefreshFlag((prevRefreshFlag) => !prevRefreshFlag);
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
        refund.productType = "LOAN";
        refund.productId = event.target.value;
        break;
      case "paymentRef":
        refund.transactionRef = event.target.value;
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
        saveButtonText="Save"
        title={"Create Refund"}
      >
        {/* Update Refund Details */}

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
      </GlobalModal>
    </div>
  );
}

export default CreateManualRefund;
