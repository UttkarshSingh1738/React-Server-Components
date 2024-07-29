import { GlobalModal } from "@smartcoin/global-components-typescript";
import React, { ReactEventHandler, SyntheticEvent, useState } from "react";
import { declineRefund, updateStatusByAction } from "./RefundTransactionApiService.tsx";
import { toast } from "sonner";
import { errorToast } from "./CustomToast.tsx";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  modelId: number | undefined;
};

const SubmitDescriptionModal = ({ isOpen, handleClose, modelId }: Props) => {
  const [inputText, setInputText] = useState<String>("");

  const handleSave = () => {
    if (modelId == undefined) return;
    const payload = {
      "refundId": modelId,
      "reason": inputText,
    };
    declineRefund(payload)
      .then((message) => {
        toast.success(
          `REFUND ( ${modelId} ) declined Refresh to see updated status`,
          {
            duration: 5000,
            position: "top-center",
          }
        );
      })
      .catch((error) => {
        errorToast(error);
      });
    window.location.reload();
  };

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <GlobalModal
        show={isOpen}
        onClose={handleClose}
        onSave={handleSave}
        saveButtonText="Save"
        title="Decline Refund Description"
      >
        <textarea className="w-100" onSelect={handleInputChange} />
      </GlobalModal>
    </div>
  );
};

export default SubmitDescriptionModal;
