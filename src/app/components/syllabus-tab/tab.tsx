"use client";
import "./tab.css";
import React, { FC, useState } from "react";

export const Tab: FC = () => {
  const [selectTab, setSelectTab] = useState("");

  const handleTabChange = (tabName: string) => {
    setSelectTab(tabName);
  };

  return (
    <div role="tablist" className="tabs tabs-lifted w-200 h-30 ">
      <label
        className={`tab ${selectTab === "General"
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
        className={`tab ${selectTab === "Outline"
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
        className={`tab ${selectTab === "Training material"
          ? "bg-black text-white"
          : "bg-gray-500 text-white"
          }`}
      >
        <input
          className="appearance-none"
          type="radio"
          name="my_tabs_2"
          role="tab"
          aria-label="Training material"
          checked={selectTab === "Training material"}
          onChange={() => handleTabChange("Training material")}
        />
        Training material
      </label>
    </div>
  );
};
