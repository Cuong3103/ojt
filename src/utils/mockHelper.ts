import { User } from "@/types/models/user.model.type";
import { faker } from "@faker-js/faker";
import { USER_ROLE } from "./constants";

export const userGenerator = (index: number): User => ({
  uuid: "qqq",
  id: index + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dob: 1000000,
  phone: "0123456789",
  email: faker.internet.email(),
  gender: true,
  status: true,
  userRoleId: USER_ROLE.ADMIN,
});
