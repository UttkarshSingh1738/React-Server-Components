'use client';
import { GlobalGenericButton } from "@smartcoin/global-components-typescript";
import React, { useEffect, useState } from "react";
import EntityTable from "./EntityTable";
// import BreadcrumbsLinks from "./BreadcrumbsLinks.tsx";
import { Toaster, toast } from "sonner";
import StageCard from "./StageCard";
import {
  findByTypeAndId,
  updateStatusByAction,
} from "./RefundTransactionApiService";
import CustomNavigate from "./CustomNavigate";
import { useParams } from "react-router-dom";
import {
  inappTransactionColumns,
  paymentColumns,
  paymentDistributionColumns,
  paymentSettlementColumns,
  userLoanColumns,
} from "./RefundTransactionInfo";
import { errorToast } from "./CustomToast";
import {
  RefundTransactionDto,
  compareRefundStatus,
} from "./RefundTransactionDto";
import SubmitDescriptionModal from "./SubmitDescriptionModal";

type Props = {};

const RefundTransactionById = (props: Props) => {
  let params = useParams();
  const [refundData, setRefundData] = useState<RefundTransactionDto>();
  const [declineDescriptionModal, setDeclineDescriptionModal] = useState(false);

  const id = parseInt(params.id !== undefined ? params.id : "-1");
  const prevLabel = [
    { label: "Home", url: "/" },
    { label: "Refund Management", url: "/refunds" },
    { label: "Refund Transaction", url: "/refundTransaction" },
  ];

  const navigate = CustomNavigate();
  const handleBreadClick = () => {
    navigate("/");
  };

  const refundProperties = [
    { property: "User Id", value: refundData?.userId },
    { property: "Payment Id", value: refundData?.paymentId },
    { property: "Amount", value: refundData?.amount },
    { property: "Pg Account", value: refundData?.pgAccountId },
    { property: "Refund Type", value: refundData?.refundType },
    { property: "Refund Stage", value: refundData?.stage },
    { property: "Approved On", value: refundData?.approvedOn },
    { property: "PG Account", value: refundData?.pgAccountId },
    { property: "Status", value: refundData?.status },
  ];

  const refreshData = () => {
    try {
      findByTypeAndId<RefundTransactionDto[]>("RefundTransaction", id).then(
        (data) => {
          setRefundData(data[0]);
        }
      );
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleActions = (type: string) => {
    updateStatusByAction(type, id)
      .then((message) => {
        toast.success(
          `REFUND ( ${id} ) ${type.toUpperCase()} Refresh to see updated status`,
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

  const handleModalClose = () => {
    setDeclineDescriptionModal(false);
  };

  const handleDeclineAction = () => {
    setDeclineDescriptionModal(true);
  };
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
            <div>
              {refundData && (
                <StageCard
                  title="Refund Transaction Details"
                  properties={refundProperties}
                />
              )}
              <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                <EntityTable
                  title="Inapp Transaction"
                  dataSource={() => findByTypeAndId("InappTransaction", id)}
                  columnConfig={inappTransactionColumns}
                />
              </div>
              <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                <EntityTable
                  title="Payments"
                  dataSource={() => findByTypeAndId("Payment", id)}
                  columnConfig={paymentColumns}
                />
              </div>
              <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                <EntityTable
                  title="User Loan"
                  dataSource={() => findByTypeAndId("UserLoan", id)}
                  columnConfig={userLoanColumns}
                />
              </div>
              <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                <EntityTable
                  title="Payment Settlement"
                  dataSource={() => findByTypeAndId("PaymentSettlements", id)}
                  columnConfig={paymentSettlementColumns}
                />
              </div>
              <div className="row ms-2 p-4 manual-refund-row-container mt-5 table-container ">
                <EntityTable
                  title="Payment Distribution"
                  dataSource={() => findByTypeAndId("PaymentDistribution", id)}
                  columnConfig={paymentDistributionColumns}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-1"></div>
          <div className="right-main-container col gap-4 me-3 d-flex flex-column align-items-center">
            {refundData &&
              compareRefundStatus(refundData?.status, ["CREATED"]) && (
                <GlobalGenericButton
                  label="Approve Refund"
                  onClick={() => handleActions("approve")}
                />
              )}
            {refundData &&
              compareRefundStatus(refundData?.status, [
                "CREATED",
                "APPROVED",
              ]) && (
                <GlobalGenericButton
                  label="Decline"
                  onClick={() => handleDeclineAction()}
                />
              )}
            {refundData &&
              compareRefundStatus(refundData?.status, [
                "CREATED",
                "APPROVED",
              ]) && (
                <GlobalGenericButton
                  label="ChargeBack"
                  onClick={() => handleActions("chargeback")}
                />
              )}
          </div>
        </div>
      </div>
      {declineDescriptionModal && (
        <SubmitDescriptionModal
          modelId={refundData?.remoteId}
          isOpen={declineDescriptionModal}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default RefundTransactionById;
