export type Syllabus = {
  id: number;
  name: string;
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
  version: string;
  modifiedBy: string;

};
