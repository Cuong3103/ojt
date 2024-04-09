"use client";
import "./tab.css";
import React, { FC, useEffect, useState } from "react";

type tabPage = {
  onTabPageChange: (tabName: string) => void;
};
export const Tab: FC<tabPage> = ({ onTabPageChange }) => {
  const [selectTab, setSelectTab] = useState("General");
  const handleTabChange = (tabName: string) => {
    setSelectTab(tabName);
    onTabPageChange(tabName);
  };

  return (
    <div role="tablist" className="tabs tabs-lifted w-200 h-30 ">
      <label
        className={`tab ${
          selectTab === "General"
            ? "bg-black text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        <input
          className="appearance-none"
          type="radio"
          name="my_tabs_2"
          role="tab"
          aria-label="General"
          checked={selectTab === "General"}
          onChange={() => handleTabChange("General")}
        />
        General
      </label>

      <label
        className={`tab ${
          selectTab === "Outline"
            ? "bg-black text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        <input
          className="appearance-none"
          type="radio"
          name="my_tabs_2"
          role="tab"
          aria-label="Outline"
          checked={selectTab === "Outline"}
          onChange={() => handleTabChange("Outline")}
        />
        Outline
      </label>

      <label
        className={`tab ${
          selectTab === "Others"
            ? "bg-black text-white"
            : "bg-gray-500 text-white"
        }`}
      >
        <input
          className="appearance-none"
          type="radio"
          name="my_tabs_2"
          role="tab"
          aria-label="Others"
          checked={selectTab === "Others"}
          onChange={() => handleTabChange("Others")}
        />
        Others
      </label>
    </div>
  );
};
