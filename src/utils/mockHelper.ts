import { User } from "@/types/models/user.model.type";
import { faker } from "@faker-js/faker";

export const userGenerator = (index: number): User => ({
  id: index + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  dob: faker.date.between("now", "2025/02/02").toISOString().slice(0, 10),
  email: faker.internet.email(),
  gender: "male",
  role: "user",
});
