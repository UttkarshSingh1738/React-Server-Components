'use client';
import EntityTable from "./EntityTable";
// import CustomNavigate from "./CustomNavigate";
import Select from "react-select";
import { GlobalGenericButton } from "@smartcoin/global-components-typescript";
// import BreadcrumbsLinks from "./BreadcrumbsLinks.tsx";
import "./styles/common-styles.css";
import { findByField, findByStatus } from "./RefundTransactionApiService";
import "./styles/RefundTransactionPage.css";
import React, { useState } from "react";
import WrapperTable from "./WrapperTable";
import { errorToast } from "./CustomToast";
import { RefundTransactionDto } from "./RefundTransactionDto";

type Props = {};

const RefundTransactionHome = (props: Props) => {
  const [search, setSearch] = useState<boolean>();
  const [categorySelectedItem, setCategorySelectedItem] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [refundData, setRefundData] = useState<
    RefundTransactionDto[] | undefined
  >(undefined);
  const categoryItems: string[] = ["User ID", "Payment ID"];
  const categoryOptions = categoryItems.map((item) => ({
    value: item,
    label: item,
  }));

  // const navigate = CustomNavigate();
  const prevLabel = [
    { label: "Home", url: "/" },
    { label: "Refund Management", url: "/refunds" },
  ];
  // const handleBreadClick = () => {
  //   navigate("/");
  // };

  const handleCategorySelect = (selectedOption: any) => {
    console.log(selectedOption);
    setCategorySelectedItem(selectedOption.value);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const columns = [
    { key: "remoteId", label: "ID", sortable: true },
    { key: "userId", label: "User ID", sortable: true },
    { key: "refundId", label: "Refund ID", sortable: true },
    { key: "pgAccountId", label: "PG Account", sortable: true },
    { key: "paymentId", label: "Payment ID", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "stage", label: "Stage", sortable: true },
    { key: "createdAt", label: "CreatedAt", sortable: true },
  ];

  const handleCaseSearch = () => {
    setSearch(true);
    try {
      if (categorySelectedItem !== null && categorySelectedItem.length > 0) {
        const payload = {
          category:
            categorySelectedItem === "User ID" ? "USER_ID" : "PAYMENT_ID",
          input: inputValue,
        };

        findByField(payload).then((data) => {
          setRefundData(data);
        });
      }
    } catch (error) {
      errorToast(error);
    }

    setSearch(false);
  };

  return (
    <div className="refundTransaction">
      {/*<BreadcrumbsLinks*/}
      {/*  prevLabel={prevLabel}*/}
      {/*  currentLabel="Refund Transaction"*/}
      {/*  onClick={handleBreadClick}*/}
      {/*/>*/}

      <div className="col-lg-10 refund-transaction-info">
        <div>
          <p className="page-title-container">Refund Transaction</p>
        </div>
        <div className="row ms-1">
          <div className="container-fluid search-container-box">
            <div className="row">
              <p className="input-search-container-search-text">Search By</p>
            </div>

            <div className="row">
              <div className="case-info-dropdown-container col-lg-6">
                <div>
                  <div className="mt-1 w-100 dropdown-styles">
                    <Select
                      onChange={handleCategorySelect}
                      options={categoryOptions}
                      placeholder="Select Category"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row mt-1">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter value"
                      className="inputTag w-100 input-search-container-case-input-text"
                    />
                  </div>
                  <div className="col-lg-6 case-info-search-button-container">
                    {search ? (
                      <GlobalGenericButton
                        label="Searching...."
                        isLoading={true}
                        removeShadow={true}
                        backgroundColor="#7DAFF5"
                        textColor="#FFFFFF"
                      />
                    ) : (
                      <GlobalGenericButton
                        label="Search"
                        removeShadow={true}
                        backgroundColor="#468DF1"
                        textColor="#FFFFFF"
                        onClick={handleCaseSearch}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ms-0 mt-5">
          <div className="container-fluid">
            <div className="table-container">
              {refundData && (
                <WrapperTable
                  title="Refund Transaction List"
                  data={refundData}
                  columns={columns}
                  // onRowClick={(
                  //   rowData: RefundTransactionDto,
                  //   rowIndex: number
                  // ) => navigate("/refundTransaction/" + rowData.remoteId)}
                />
              )}
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Created Refunds"
                dataSource={() => findByStatus("CREATED")}
                columnConfig={columns}
                // onRowClick={(rowData: RefundTransactionDto, rowIndex: number) =>
                //   navigate("/refundTransaction/" + rowData.remoteId)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Approved Refunds"
                dataSource={() => findByStatus("APPROVED")}
                columnConfig={columns}
                // onRowClick={(rowData: RefundTransactionDto, rowIndex: number) =>
                //   navigate("/refundTransaction/" + rowData.remoteId)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Processed Refunds"
                dataSource={() => findByStatus("PROCESSED")}
                columnConfig={columns}
                // onRowClick={(rowData: RefundTransactionDto, rowIndex: number) =>
                //   navigate("/refundTransaction/" + rowData.remoteId)
                // }
              />
            </div>
            <div className="table-container table-stack">
              <EntityTable
                title="Cancelled Refunds"
                dataSource={() => findByStatus("CANCELED")}
                columnConfig={columns}
                // onRowClick={(rowData: RefundTransactionDto, rowIndex: number) =>
                //   navigate("/refundTransaction/" + rowData.remoteId)
                // }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundTransactionHome;