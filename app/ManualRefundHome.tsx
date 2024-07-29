'use client'
import React from "react";
import { GlobalGenericButton } from "@smartcoin/global-components-typescript";
import { ManualRefundStatus } from "./ManualRefundDto";
import { ManualRefundDto } from "./ManualRefundDto";
// import BreadcrumbsLinks from "./BreadcrumbsLinks.tsx";
import EntityTable from "./EntityTable";
// import CustomNavigate from "./CustomNavigate";
import { findByStatus } from "./ManualRefundApiService";
import "./styles/common-styles.css";
import { useState } from "react";
import CreateManualRefund from "./CreateManualRefund";
import { Toaster } from "sonner";

function ManualRefundHome() {
  // const navigate = CustomNavigate();
  const prevLabel = [
    { label: "Home", url: "/" },
    { label: "Refund Management", url: "/refunds" },
  ];
  // const handleBreadClick = () => {
  //   navigate("/");
  // };

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const handleCreateOpen = () => {
    setCreateModalOpen(true);
  };
  const handleCreateClose = () => {
    setCreateModalOpen(false);
  };

  const columns = [
    { key: "userId", label: "User ID", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "productType", label: "Product", sortable: true },
    { key: "productId", label: "Product ID", sortable: true },
    { key: "paymentRef", label: "Payment Ref", sortable: true },
    // { key: "type", label: "Type", sortable: true },
    // { key: "customerName", label: "Customer Name", sortable: true },
    // { key: "customerAccountNumber", label: "Customer Account Number", sortable: true },
    // { key: "customerIfsc", label: "Customer IFSC", sortable: true },
    // { key: "customerBankName", label: "Customer Bank Name", sortable: true },
    // { key: "transferAccountNumber", label: "Transfer Account Number", sortable: true },
    // { key: "transferIfsc", label: "Transfer IFSC", sortable: true },
    // { key: "transferBankName", label: "Transfer Bank Name", sortable: true },
    // { key: "transferDate", label: "Transfer Date", sortable: true },
    // { key: "transferUtr", label: "Transfer UTR", sortable: true },
    // { key: "extraData", label: "Extra Data", sortable: false }, // Assuming not sortable
    // { key: "userName", label: "User Name", sortable: true },
  ];

  const handleCreateManualRefund = () => {};

  return (
    <div className="manualRefund">
      {/*<BreadcrumbsLinks*/}
      {/*  prevLabel={prevLabel}*/}
      {/*  currentLabel="Manual Refund"*/}
      {/*  onClick={handleBreadClick}*/}
      {/*/>*/}
      <Toaster richColors />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="left-main-container col-lg-8 mb-5">
            <div className="table-container">
              <EntityTable
                title="User Data Pending Refunds"
                dataSource={() => findByStatus(ManualRefundStatus.DATA_PENDING)}
                columnConfig={columns}
                // onRowClick={(rowData: ManualRefundDto, rowIndex: number) =>
                //   navigate("/manualRefund/" + rowData.id)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Verification Pending Refunds"
                dataSource={() =>
                  findByStatus(ManualRefundStatus.VERIFICATION_PENDING)
                }
                columnConfig={columns}
                // onRowClick={(rowData: ManualRefundDto, rowIndex: number) =>
                //   navigate("/manualRefund/" + rowData.id)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Transfer Pending Refunds"
                dataSource={() =>
                  findByStatus(ManualRefundStatus.TRANSFER_PENDING)
                }
                columnConfig={columns}
                // onRowClick={(rowData: ManualRefundDto, rowIndex: number) =>
                //   navigate("/manualRefund/" + rowData.id)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Processed Refunds"
                dataSource={() => findByStatus(ManualRefundStatus.TRANSFERRED)}
                columnConfig={columns}
                // onRowClick={(rowData: ManualRefundDto, rowIndex: number) =>
                //   navigate("/manualRefund/" + rowData.id)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Failed Refunds"
                dataSource={() => findByStatus(ManualRefundStatus.FAILED)}
                columnConfig={columns}
                // onRowClick={(rowData: ManualRefundDto, rowIndex: number) =>
                //   navigate("/manualRefund/" + rowData.id)
                // }
              />
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="right-main-container col gap-4 me-3 d-flex flex-column align-items-center">
            <GlobalGenericButton
              label="Create Manual Refund"
              onClick={handleCreateOpen}
            />
          </div>
        </div>
      </div>

      <div className="modal-container">
        {createModalOpen && (
          <CreateManualRefund
            state={createModalOpen}
            handleClose={handleCreateClose}
          />
        )}
      </div>
    </div>
  );
}

export default ManualRefundHome;
