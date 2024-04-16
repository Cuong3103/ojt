"use client"

import React, { FC, useEffect, useState } from 'react'
import Image from "next/image";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
import { getProgramById } from '@/services/programs/programService';
import { Program } from '@/types/models/user.model.type';
import { Syllabus } from '@/types/syllabus.type';
import { getSyllabusByID, getUnitByID } from '@/services/syllabuses/syllabusService';
import { convertMillisecondsToHoursAndMinutes, fromTimestampToDateString } from '@/utils/formatUtils';
import { Unit } from '@/types/models/unit.model.type';

type trainingProgramViewDetailProps = {
    programId: number | undefined,
    onSyllabusData: (totalDays: number, totalDuration: number) => void;
}

interface MaxDaysPerSyllabus {
    [key: number]: number;
  }


const TrainingProgramViewDetail: FC<trainingProgramViewDetailProps> = ({programId, onSyllabusData}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [program, setProgram] = useState<Program>();
    //console.log("program", program);

    const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
    //console.log("syllabuses", syllabuses);
    
    const [unitDetails, setUnitDetails] = useState<Unit[]>([]);
    //console.log("unitDetails", unitDetails);
    const [days, setDays] = useState<number>(0);
    const [duration, setDuration] = useState<string>();



    useEffect(() => {
        const fetchProgram = async () => {
            
            try {
              const response = await getProgramById(programId)
              setProgram(response.content as any);
            } catch (error) {
              console.error("Error fetching syllabuses:", error);
            }  
        };
    
        fetchProgram();
      }, [programId]);

      useEffect(() => {
        const fetchSyllabuses = async () => {
          if (program?.syllabusIds) {
            setLoading(true);
            try {
              const responses = await Promise.all(
                program.syllabusIds.map((id) => getSyllabusByID(id))
              );
              setSyllabuses(responses.map((response) => response.content || []));
            } catch (error) {
              console.error("Error fetching syllabuses:", error);
            }
            setLoading(false);
          }
        };
    
        fetchSyllabuses();
      }, [program]);

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
      
      const maxDaysPerSyllabus = calculateMaxDaysPerSyllabus(unitDetails)


      useEffect(() => {
        if (syllabuses.length > 0 && unitDetails.length > 0) {
          const totalDays = Object.values(maxDaysPerSyllabus).reduce((acc, day) => acc + day, 0);
          setDays(totalDays)
          const totalDuration = syllabuses.reduce((acc, syllabus) => acc + syllabus.duration, 0);   
          setDuration(convertMillisecondsToHoursAndMinutes(totalDuration))
          onSyllabusData(totalDays, totalDuration);
        }
      }, [syllabuses, unitDetails]);
      


  return (
    <div className="">
    <div className=" white-box border-2 bg-primary-color border-gray-400 h-[95px] text-white ">
      <div
        className="items-center font-bold mt-[10px] mb-[10px]  "
        style={{ letterSpacing: "0.3em" }}
      >
        <span className="ml-[20px] text-[25px] ">{program?.name}</span>
      </div>
      <div className="flex mb-[5px] ml-[20px]">
        <div style={{ fontSize: "17px" }}>
          {days} days <span style={{ fontStyle: "italic" }}> ({duration})</span> |
        </div>
        <div className='ml-[5px]'>Modified on {fromTimestampToDateString(+program?.createdDate / 1000)} by {program?.modifiedBy}</div>
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
      className=" white-box border-2 bg-primary-color h-[16px] mt-[10px]"
      style={{
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      }}
    ></div>
  </div>
  )
}

export default TrainingProgramViewDetail;