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
  uuid?: string;
  programName?: string;
  createdOn?: string;
  createdBy?: string;
  duration?: string;
  status?: string;
  createdDate?: string;
};


