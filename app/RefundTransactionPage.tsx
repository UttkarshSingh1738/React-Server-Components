import { useEffect, useState } from "react";
import DetailPanel from "../ui-common/components/detail-panel/DetailPanel";
import { useParams } from "react-router-dom";
import { GlobalGenericButton } from "@smartcoin/global-components-typescript";
import "../ui-common/styles/common-styles.css";
import BreadcrumbsLinks from "../ui-common/breadcrumbs/BreadcrumbsLinks";
import CustomNavigate from "../ui-common/customNavigate/CustomNavigate";

type Props = {};

const RefundTransactionPage = (props: Props) => {
  let params = useParams();
  const id = parseInt(params.id !== undefined ? params.id : "-1");

  const [refundTransaction, refundTransactionData] = useState({});
  const [paymentSettlementData, setPaymentSettlementData] = useState({
    DOB: "--",
    Gender: "--",
    "Permanent Address": "--",
  });
  const navigate = CustomNavigate();
  const prevLabel = [{ label: "Home", url: "/" }];
  const handleBreadClick = () => {
    navigate("/");
  };

  useEffect(() => {}, []);
  const handleClick = () => {};
  return (
    <div className="manualRefund">
      <BreadcrumbsLinks
        prevLabel={prevLabel}
        currentLabel="Maunal Refund"
        onClick={handleBreadClick}
      />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="left-main-container col-lg-8 mb-5">
            <DetailPanel detailKeyAndValueMap={paymentSettlementData} />
            <div className="mt-3">
              <DetailPanel detailKeyAndValueMap={paymentSettlementData} />
            </div>
            <div className="mt-3">
              <DetailPanel detailKeyAndValueMap={paymentSettlementData} />
            </div>
            <div className="mt-3">
              <DetailPanel
                detailKeyAndValueMap={paymentSettlementData}
                heading="Payment Settlement Details"
              />
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="right-main-container col gap-4 me-3 d-flex flex-column align-items-center">
            <GlobalGenericButton
              label="Create Manual Refund"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundTransactionPage;
