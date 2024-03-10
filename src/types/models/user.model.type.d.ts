import { USER_ROLE } from "@/utils/constants";

export type User = {
  id: number;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  email: string;
  dob: number;
  gender: "male" | "female";
  role: USER_ROLE;
  phone?: string;
  status?: string; //TODO: This field is quite not transparent
  modifiedDate?: string;
  createdDate?: string;
};
