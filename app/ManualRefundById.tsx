'use client';
import React from "react";
import { GlobalGenericButton } from "@smartcoin/global-components-typescript";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findById, findSupportTaskById } from "./ManualRefundApiService";
import EntityTable from "./EntityTable";
import "./styles/ManualRefundStyles.css";
// import BreadcrumbsLinks from "./BreadcrumbsLinks.tsx";
import "./styles/common-styles.css";
import CustomNavigate from "./CustomNavigate";
import UpdateRefund from "./UpdateManualRefund";
import StageCard from "./StageCard";
import { ManualRefundDto } from "./ManualRefundDto";
import { stat } from "fs";
import { Toaster } from "sonner";
import { errorToast } from "./CustomToast";

interface ManualRefundPageProps {
  initData: ManualRefundDto;
}

function ManualRefundPage() {
  const [refund, setRefund] = useState<ManualRefundDto>();
  // const [tasks, setTasks] = useState<any[]>();

  let params = useParams();
  const id = parseInt(params.id !== undefined ? params.id : "-1");

  const refreshData = () => {
    findById(id)
      .then((data) => {
        setRefund(data);
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const [updateModalType, setUpdateModalType] = useState<string | undefined>();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateOpen = (type: string) => {
    setUpdateModalType(type);
    setUpdateModalOpen(true);
  };
  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
    setUpdateModalType(undefined);
    refreshData();
  };

  const prevLabel = [
    { label: "Home", url: "/" },
    { label: "Refund Management", url: "/refunds" },
    { label: "Manual Refund", url: "/manualRefund" },
  ];

  const navigate = CustomNavigate();
  const handleBreadClick = () => {
    navigate("/");
  };

  const supportTaskColumns = [
    { key: "id", label: "Task Id", sortable: true },
    { key: "supportUser", label: "Support User", sortable: true },
    { key: "type", label: "Task Type", sortable: false },
    // { key: "data", label: "Data", sortable: false },
    // { key: "modelId", label: "Refund Id", sortable: true },
    // { key: "userId", label: "User Id", sortable: true },
    { key: "loggedOn", label: "Logged On", sortable: true },
  ];

  const refundProperties = [
    { property: "User Id", value: refund?.userId },
    { property: "Product", value: refund?.productType },
    { property: "Product Id", value: refund?.productId },
    { property: "Amount", value: refund?.amount },
    { property: "Payment Ref (if any)", value: refund?.transactionRef },
  ];

  const customerProperties = [
    { property: "Name", value: refund?.customerName },
    { property: "Bank Name", value: refund?.customerBankName },
    { property: "Account Number", value: refund?.customerAccountNumber },
    { property: "Ifsc", value: refund?.customerIfscCode },
  ];

  const transferProperties = [
    { property: "Bank Name", value: refund?.transferBankName },
    { property: "Account Name", value: refund?.transferAccountName },
    { property: "Account Number", value: refund?.transferAccountNumber },
    { property: "Ifsc", value: refund?.transferIfscCode },
    { property: "Utr", value: refund?.transferUtr },
    { property: "Transfer Date", value: refund?.transferDate },
  ];

  function convertToObjectArray(obj: any) {
    if (obj == undefined) return [];
    return Object.keys(obj).map((key) => {
      return { property: key, value: obj[key] };
    });
  }

  const extraProperties = convertToObjectArray(refund?.metadata);

  // if (refund?.metadata ? ["failureReason"] : false) {
  //   extraProperties.push({
  //     property: "Failure reason",
  //     value: refund?.metadata?.["failureReason"],
  //   });
  // }

  // const getUpdateButton = (status: ManualRefundStatus): React.ReactNode => {
  //   switch (status) {
  //     case ManualRefundStatus.DATA_PENDING:
  //       return (
  //         <GlobalGenericButton
  //           label="Update Customer Details"
  //           backgroundColor="#468DF1"
  //           textColor="#FFFFFF"
  //           borderColor="#468DF1"
  //           onClick={() => handleUpdateOpen("CustomerDetailsUpdate")}
  //         />
  //       );
  //     case ManualRefundStatus.TRANSFER_PENDING:
  //       return (
  //         <GlobalGenericButton
  //           label="Update Transfer Details"
  //           backgroundColor="#468DF1"
  //           textColor="#FFFFFF"
  //           borderColor="#468DF1"
  //           onClick={() => handleUpdateOpen("TransferDetailsUpdate")}
  //         />
  //       );
  //   }
  // };

  return (
    <div className="manualRefund">
      {/*<BreadcrumbsLinks*/}
      {/*  prevLabel={prevLabel}*/}
      {/*  currentLabel={id + ""}*/}
      {/*  onClick={handleBreadClick}*/}
      {/*/>*/}

      <Toaster richColors />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="left-main-container mb-5 col-lg-8">
            {refund && (
              <div>
                <StageCard
                  title="Refund Transaction Details"
                  properties={refundProperties}
                />

                <StageCard
                  title="Customer Account Details"
                  properties={customerProperties}
                />

                <StageCard
                  title="Transfer Account Details"
                  properties={transferProperties}
                />

                {extraProperties.length > 0 && (
                  <StageCard
                    title="Extra Details"
                    properties={extraProperties}
                  />
                )}

                <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                  <EntityTable
                    title="Support Tasks"
                    dataSource={() => findSupportTaskById(id)}
                    columnConfig={supportTaskColumns}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-1"></div>
          <div className="right-main-container col gap-4 me-3 d-flex flex-column align-items-center">
            <div className=" w-100 status-view">Status : {refund?.status}</div>
            {/* <GlobalGenericButton
              label="Update Refund Details"
              onClick={() => handleUpdateOpen("RefundDetailsUpdate")}
            /> */}
            <GlobalGenericButton
              label="Update Customer Details"
              onClick={() => handleUpdateOpen("CustomerDetailsUpdate")}
            />
            <GlobalGenericButton
              label="Verify Customer Details"
              onClick={() => handleUpdateOpen("VerifyDetails")}
            />
            <GlobalGenericButton
              label="Update Transfer Details"
              onClick={() => handleUpdateOpen("TransferDetailsUpdate")}
            />
            <GlobalGenericButton
              label="Fail"
              onClick={() => handleUpdateOpen("FailTransaction")}
            />
          </div>
        </div>
      </div>

      <div className="modal-container">
        {updateModalOpen && updateModalType && refund && (
          <UpdateRefund
            type={updateModalType}
            state={updateModalOpen}
            handleClose={handleUpdateClose}
            initRefund={refund}
          />
        )}
      </div>
    </div>
  );
}

export default ManualRefundPage;
