import React from "react";
import "./styles/common-styles.css";
import "./styles/ManualRefundStyles.css";

export interface DataPair {
  property: string;
  value: any;
}

export interface StageCardProps {
  title: String;
  properties: DataPair[];
}

function StageCard({ title, properties }: StageCardProps) {
  return (
    <div className="row ms-2 p-4 mb-5 manual-refund-row-container">
      <div className="ms-5">
        <div className="row col-lg-6 my-4">
          <p className="manual-refund-sub-container-heading">
            {title} {/* Render the title dynamically */}
          </p>
        </div>
        {properties.map((property, index) => (
          <div key={index} className="row col-lg-9 my-4 mt-1 mb-1">
            <div className="row col-lg-6 text-muted">
              <p>{property.property}:</p> {/* Render property dynamically */}
            </div>
            <div className="row col-lg-6">
              <p>{property.value}</p> {/* Render value dynamically */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StageCard;
