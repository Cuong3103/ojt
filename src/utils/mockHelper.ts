import { User } from "@/types/models/user.model.type";
import { faker } from "@faker-js/faker";
import { USER_ROLE } from "./constants";

export const userGenerator = (index: number): User => ({
  id: index + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  fullName: faker.person.fullName(),
  dob: 1000000,
  email: faker.internet.email(),
  gender: "male",
  role: USER_ROLE.ADMIN,
});
