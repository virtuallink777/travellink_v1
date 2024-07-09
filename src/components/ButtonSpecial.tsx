import React, { useState } from "react";
import "../specialcss/buttoncss.css";

const ButtonSpecial: React.FC = () => {
  const [selectedType, setSelectedType] = useState<"go" | "goAndBack" | null>(
    null
  );

  const handleGoClick = () => {
    setSelectedType(selectedType === "go" ? null : "go");
  };

  const handleGoAndBackClick = () => {
    setSelectedType(selectedType === "goAndBack" ? null : "goAndBack");
  };

  return (
    <>
      <div className="flex flex-col justify-center mb-5 mr-10 ml-2 mt-5">
        <button
          type="button"
          className={`flight-type-button ${
            selectedType === "go" ? "selected" : ""
          }`}
          onClick={handleGoClick}
        >
          <div className="checkbox-container">
            <div className="checkbox-circle"></div>
          </div>
          <span className="button-text">Solo ida</span>
          <i className="material-symbols-outlined flight-type">
            flight_takeoff
          </i>
        </button>
      </div>

      <div className="flex flex-col justify-center mb-5 mr-10 ml-2 mt-5">
        <button
          type="button"
          className={`flight-type-button ${
            selectedType === "goAndBack" ? "selected" : ""
          }`}
          onClick={handleGoAndBackClick}
        >
          <div className="checkbox-container">
            <div className="checkbox-circle"></div>
          </div>
          <span className="button-text">Ida y vuelta</span>
          <i className="material-symbols-outlined flight-type">sync_alt</i>
        </button>
      </div>
    </>
  );
};

export default ButtonSpecial;
