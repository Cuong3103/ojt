import React, { FC } from "react";
import { SlClose } from "react-icons/sl";

import "./syllabus.css";

interface SyllabusCardProps {
  name: string;
  status: string; 
  version: string;
  duration: string;
  modifiedBy: string;
  modifiedDate: string;
  days?:number;
}


export const SyllabusCard: FC<SyllabusCardProps> = ({ name, status, version, duration, modifiedBy, modifiedDate, days }) => {
  return (
    <div className="syllabus-container">
      <div className="top-content">
        <div className="top-left-content">
          <div className="course-name">{name}</div>
          <div className="status">
            {status}
          </div>
        </div>
        <div className="top-right-icon">
          <SlClose />
        </div>
      </div>
      <div className="bot-content">
        <p className="course-content">{version}</p>
        <div className="vertical-line"></div>
        <p className="course-content">{`${days ?days : ''} days`} ({duration})</p>
        <div className="vertical-line"></div>
        <p className="course-content">Modified on {modifiedDate} by {modifiedBy}</p>
      </div>
    </div>
  );
};
