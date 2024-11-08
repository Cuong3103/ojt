import { USER_ROLE } from "@/utils/constants";

export type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  username?: string;
  fullName?: string;
  email: string;
  dob?: number;
  avatarUrl?: string;
  gender: string;
  role?: USER_ROLE;
  userRoleId: number;
  phone: string;
  status: boolean;
  modifiedDate?: string;
  createdDate?: string;
};

export type Program = {
  id: number;
  name: string;
  uuid?: string;
  startTime: number;
  duration?: number;
  training_status: number;
  status?: boolean;
  syllabusIds: number[];
  createdDate?: string;
  createBy?: string;
  modifiedBy?: string;
};

type Content = {
  dayId?: number;
  unitId?: number;
  name?: string;
  outputStandard?: string;
  trainingTime?: number;
  deliveryType?: string;
  method?: string;
  duration?: string;
};
