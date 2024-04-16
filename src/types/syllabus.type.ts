export type Syllabus = {
  name: string;
  id?: number;
  code: string;
  createdDate: number;
  createBy: string;
  duration: string;
  outputStandard: string[];
  status: string;
  description: string;
  isActive: boolean;
  isApproved: boolean;
  attendee: number;
  unitIds: number[];
};
