export type User = {
  id: number;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  dob: string;
  gender: "male" | "female";
  role: "admin" | "user";
  status?: number; //TODO: This field is quite not transparent
  modifiedDate?: string;
  createdDate?: string;
};
