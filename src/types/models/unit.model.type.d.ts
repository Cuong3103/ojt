export type Unit = {
  id: number;
  syllabusId: number;
  name: string;
  duration: number;
  status: boolean;
  dayNumber: string;
  contentIds: number[];
  createBy: string;
  modifiedBy: string;
};
