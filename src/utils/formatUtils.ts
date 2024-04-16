import { format, parse } from "date-fns";

export const fromTimestampToDateString = (
  timestamp: number | undefined
): string => {
  if (timestamp === undefined) {
    return "";
  }
  const date = new Date(timestamp*1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const fromDateToTimestamp = (date: Date): number => {
  return Math.round(date.getTime() / 1000);
};

export const convertDateToTimestamp = (dateString: string): number => {
 // Chuyển đổi chuỗi ngày tháng sang đối tượng Date
 const dateObject: Date = parse(dateString, 'dd/MM/yyyy', new Date());
 // Lấy timestamp từ đối tượng Date
 const timestamp: number = dateObject.getTime();
 // Trả về giá trị timestamp
 return timestamp / 1000;
};


export const  convertMillisecondsToHoursAndMinutes = (milliseconds: number):string => {
  const hours = Math.floor(milliseconds / 3600000); // Lấy phần nguyên của giờ
  const minutes = Math.floor((milliseconds % 3600000) / 60000); // Lấy phần dư của mili giây chia cho số mili giây trong một phút
  if(minutes === 0){
    return `${hours} hours`
  } else{
    return `(${hours} hours ${minutes} minutes)`;
  }
}