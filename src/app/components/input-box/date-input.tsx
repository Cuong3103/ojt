import { FC, useRef, useState } from "react";
import { DatePicker } from "../date-picker/date-picker";
import { RiCalendarLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dayjs, { Dayjs } from "dayjs";

type DateInputProps = {
  label: string;
  value?: Dayjs;
  name: string;
  error?: string;
  onChange?: (value: Dayjs | undefined) => void;
};

export const DateInput: FC<DateInputProps> = ({
  label,
  value,
  name,
  error,
  onChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputElement = inputRef.current;
  const inputOffsetLeft = inputElement ? inputElement.offsetLeft : 0;
  const inputOffsetTop = inputElement ? inputElement.offsetTop : 0;
  const inputOffsetHeight = inputElement ? inputElement.offsetHeight : 0;

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    onChange && onChange(date);
  };
  return (
    <>
      <div
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="inputbox relative"
      >
        <form className="inputbox__form">
          <input
            aria-label={name}
            ref={inputRef}
            type="text"
            placeholder={label}
            className={`input input-bordered w-full max-w-xs pr-10 ${
              error ? "error" : ""
            }`}
            defaultValue={value?.format("DD/MM/YYYY")}
            readOnly
          />
          {error && <p className="text-red-600 text-xs italic">{error}</p>}
          {selectedDate && (
            <AiOutlineCloseCircle
              className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setSelectedDate(undefined)}
            />
          )}
          <RiCalendarLine className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" />
        </form>

        {showDatePicker && (
          <div
            className="absolute z-50 bg-white max-w-sm mx-auto rounded shadow-lg"
            style={{
              left: inputOffsetLeft,
              top: inputOffsetTop + inputOffsetHeight,
            }}
          >
            <div className="relative bg-white max-w-sm mx-auto rounded shadow-lg">
              <DatePicker
                selectDate={selectedDate || dayjs()}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
