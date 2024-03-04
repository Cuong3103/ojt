export type User = {
  id: number;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  email: string;
  dob: string;
  gender: "male" | "female";
  role: "admin" | "user";
  phone?: string;
  status?: string; //TODO: This field is quite not transparent
  modifiedDate?: string;
  createdDate?: string;
};
