export type Syllabus = {
  id: number;
  name: string;
  id?: number;
  code: string;
  createdDate: number;
  createBy: string;
  duration: number;
  outputStandard: string[];
  status: string;
  description: string;
  isActive: boolean;
  isApproved: boolean;
  attendee: number;
  unitIds: number[];
};
