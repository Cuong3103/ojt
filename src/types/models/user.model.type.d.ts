import { USER_ROLE } from "@/utils/constants";

export type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  dob?: number;
  avatarUrl?: string;
  gender?: boolean;
  role?: USER_ROLE;
  userRoleId: number;
  phone: string;
  status: boolean;
  modifiedDate?: string;
  createdDate?: string;
};

export type Program = {
  id: number;
  uuid?: string;
  programName?: string;
  createdOn?: string;
  createdBy?: string;
  duration?: string;
  status?: string;
  createdDate?: string;
};

type Content = {
  dayId: number;
  unitId: number;
  name: string;
  outputStandard: string;
  trainingTime: number;
  deliveryType: string;
  method: string;
};
