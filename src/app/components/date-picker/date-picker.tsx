"use client";
import React, { ChangeEvent, FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn, { generateDate, months, days } from "../../../helpers/calendar";

type DatePickerProps = {
  onDateSelect: (date: Dayjs) => void;
  selectDate: Dayjs;
};

export const DatePicker: FC<DatePickerProps> = ({
  onDateSelect,
  selectDate,
}) => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const [internalSelectDate, setInternalSelectDate] = useState(selectDate);

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedMonth(selectedValue);
    setToday(today.month(selectedValue));
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedYear(selectedValue);
    setToday(today.year(selectedValue));
  };

  const handleDayClick = (date: Dayjs) => {
    setInternalSelectDate(date);
    onDateSelect(date);
  };

  const renderDaysInCalendar = () => {
    return generateDate(today.month(), today.year()).map(
      ({ date, currentMonth, today }, index) => (
        <div
          key={index}
          className="p-2 text-center h-7 grid place-content-center text-sm "
        >
          <h1
            className={cn(
              today ? "underline" : "",
              currentMonth ? "" : "text-gray-400",
              internalSelectDate &&
                date &&
                internalSelectDate.toDate().toDateString() ===
                  date.toDate().toDateString()
                ? "bg-black text-white"
                : "",
              "h-6 w-6 text-[#2D3748] rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
            )}
            onClick={() => {
              handleDayClick(date);
            }}
          >
            {date.date()}
          </h1>
        </div>
      )
    );
  };

  return (
    <>
      <div className="inline-flex flex-col items-start gap-4 p-4 bg-white shadow-xl border border-10 rounded">
        <div className="flex px-30 justify-center items-center gap-102 self-stretch">
          <GrFormPrevious
            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />

          <h1 className="text-center font-bold mx-5 text-[#2D3748] text-lg leading-6">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="text-center font-inter font-bold text-blueGray-700 text-lg leading-6 cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </h1>

          <h1 className="text-center font-bold mx-5 text-[#2D3748] text-lg leading-6">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="text-center font-inter font-bold text-blueGray-700 text-lg leading-6 cursor-pointer"
            >
              {Array.from(
                { length: 10 },
                (_, index) => today.year() - 3 + index
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </h1>

          <div className="flex gap-10 items-center ">
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day: string, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-10 w-10 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className="grid grid-cols-7">{renderDaysInCalendar()}</div>
      </div>
    </>
  );
};
