"use client";
import "./tab.css";
import React, { FC, useEffect, useState } from "react";

type tabPage = {
  onTabPageChange: (tabName: string) => void;
  tabLabels: string[];
};

export const Tab: FC<tabPage> = ({ onTabPageChange, tabLabels }) => {
  const [selectTab, setSelectTab] = useState(tabLabels?.length > 0 ? tabLabels[0] : 'Default Tab');

  const handleTabChange = (tabName: string) => {
    setSelectTab(tabName);
    onTabPageChange(tabName);
  };

  if (!tabLabels || tabLabels.length === 0) {
    return <div>No tabs available</div>;
  }

  useEffect(() => {
    if (tabLabels.length > 0) {
      setSelectTab(tabLabels[0]);
    }
  }, [tabLabels]);
  
  

  return (
    <div role="tablist" className="tabs tabs-lifted w-200 h-30 ">
      {tabLabels.map((label) => (
        <label
          key={label}
          className={`tab ${
            selectTab === label
              ? "bg-black text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          <input
            className="appearance-none"
            type="radio"
            name="tab-group"
            role="tab"
            aria-label={label}
            checked={selectTab === label}
            onChange={() => handleTabChange(label)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};
