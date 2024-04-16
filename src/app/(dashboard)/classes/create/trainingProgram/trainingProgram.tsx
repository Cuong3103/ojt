"use client";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
import React, { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { Program } from "@/types/models/user.model.type";
import { programService } from "@/services/programs/programService";
import { Syllabus } from "@/types/syllabus.type";
import {
  getSyllabusByID,
  getUnitByID,
} from "@/services/syllabuses/syllabusService";
import {
  convertMillisecondsToHoursAndMinutes,
  fromTimestampToDateString,
} from "@/utils/formatUtils";
import { Unit } from "@/types/models/unit.model.type";

interface TrainingProgramProps {
  onProgramSelect: (programId: number) => void;
  onSyllabusData: (totalDays: number, totalDuration: number) => void;
}

interface MaxDaysPerSyllabus {
  [key: number]: number;
}

const TrainingProgram: FC<TrainingProgramProps> = ({ onProgramSelect, onSyllabusData }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>(
    undefined
  );
  const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
  const [unitDetails, setUnitDetails] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const { data } = await programService.getProgram();
        setPrograms(data.content || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching program data:", error);
        setLoading(false);
      }
    };
    fetchProgram();
  }, []);

  useEffect(() => {
    const fetchSyllabuses = async () => {
      if (selectedProgram?.syllabusIds) {
        setLoading(true);
        try {
          const responses = await Promise.all(
            selectedProgram.syllabusIds.map((id) => getSyllabusByID(id))
          );
          setSyllabuses(responses.map((response) => response.content || []));
        } catch (error) {
          console.error("Error fetching syllabuses:", error);
        }
        setLoading(false);
      }
    };

    fetchSyllabuses();
  }, [selectedProgram]);

  const fetchUnitDetails = async (unitIds: number[]) => {
    try {
      const unitPromises = unitIds.map((id) => getUnitByID(id));
      const unitResponses = await Promise.all(unitPromises);
      setUnitDetails(unitResponses.map((response) => response.content || []));
    } catch (error) {
      console.error("Error fetching unit details:", error);
    }
  };

  useEffect(() => {
    if (syllabuses.length > 0) {
      const allUnitIds = syllabuses.reduce(
        (acc: number[], syllabus) => [...acc, ...syllabus.unitIds],
        [] as number[]
      );
      fetchUnitDetails(allUnitIds);
    }
  }, [syllabuses]);

  const handleProgramSelect = (value: number | undefined) => {
    const program = programs.find((program) => program.id === value);
    setSelectedProgram(program);
    if (value !== undefined) {
      onProgramSelect(value);
    }
  };

  const calculateMaxDaysPerSyllabus = (units: Unit[]): MaxDaysPerSyllabus => {
    const syllabusDays: MaxDaysPerSyllabus = {};

    units.forEach((unit) => {
      const dayNumber = parseInt(unit.dayNumber);
      if (
        !syllabusDays[unit.syllabusId] ||
        syllabusDays[unit.syllabusId] < dayNumber
      ) {
        syllabusDays[unit.syllabusId] = dayNumber;
      }
    });

    return syllabusDays;
  };
  
  const maxDaysPerSyllabus = calculateMaxDaysPerSyllabus(unitDetails);

  useEffect(() => {
    if (syllabuses.length > 0 && unitDetails.length > 0) {
      const totalDays = Object.values(maxDaysPerSyllabus).reduce((acc, day) => acc + day, 0);
      const totalDuration = syllabuses.reduce((acc, syllabus) => acc + syllabus.duration, 0);   
      onSyllabusData(totalDays, totalDuration);
    }
  }, [syllabuses, unitDetails]);

  return (
    <div>
      <div className=" white-box border-2 bg-primary-color border-gray-400">
        <div className="ml-[30px] mt-[10px] mb-[20px] mr-[30px]">
          <div className="text-white mb-[10px] text-[20px]">
            <span>Training Program name </span>
          </div>
          <div className="relative rounded-lg">
            <Select
              showSearch
              style={{ width: "40%" }}
              size={"large"}
              placeholder="Search..."
              optionFilterProp="children"
              loading={loading}
              onChange={(e) => handleProgramSelect(e)}
              value={selectedProgram?.id}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                optionA.label
                  .toLowerCase()
                  .localeCompare(optionB.label.toLowerCase())
              }
              options={programs.map((program) => ({
                value: program.id,
                label: program.name,
              }))}
            />
          </div>
        </div>
      </div>

      <div className="mt-[10px]">
        {syllabuses.map((syllabus, index) => (
          <SyllabusCard
            key={index}
            name={syllabus.name}
            status={syllabus.status ? "Active" : "Inactive"}
            version={`v${syllabus.version}`}
            duration={`${convertMillisecondsToHoursAndMinutes(syllabus.duration)}`}
            modifiedBy={syllabus.modifiedBy}
            modifiedDate={fromTimestampToDateString(syllabus.createdDate / 1000)}
            days = {maxDaysPerSyllabus[syllabus.id]}
          />
        ))}
      </div>
      <div
        className="white-box border-2 bg-primary-color h-[16px] mt-[10px]"
        style={{
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default TrainingProgram;
