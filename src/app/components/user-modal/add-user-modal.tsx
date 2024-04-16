import { RadioButton } from "@/app/components/button/radio-button";
import { InputBox } from "@/app/components/input-box/input-box";
import { Modal } from "@/app/components/modal/modal";
import { Toggle } from "@/app/components/toggle/toggle";
import { MockResponse } from "@/app/services/mock-response.service";
import { User } from "@/types/models/user.model.type";
import { SUCCESS_HTTP_CODES, USER_ROLE } from "@/utils/constants";
import { validateUserFields } from "@/utils/validateUserUtils";
import { Dayjs } from "dayjs";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { Dropdown } from "../dropdown/dropdown";
import { DateInput } from "../input-box/date-input";
import { addUser } from "@/services/users";
import { fromTimestampToDateString } from "@/utils/formatUtils";

type AddUserModalProps = {
  showAddModal: () => void;
  setUsers: Dispatch<SetStateAction<any>>;
};

const options = [
  { value: USER_ROLE.TRAINER, label: "Trainer" },
  { value: USER_ROLE.ADMIN, label: "Admin" },
];

export const AddUserModal: FC<AddUserModalProps> = ({
  showAddModal,
  setUsers,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState<Dayjs>();
  const [gender, setGender] = useState("MALE");
  const [status, setStatus] = useState<boolean>(true);
  const [userRoleId, setUserRoleId] = useState<number>(1);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserRoleId(parseInt(event.target.value));
  };
  const handleSave = async () => {
    const errors = validateUserFields({
      fullName,
      birthDay,
      email,
      phone,
      userRoleId,
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const createUser = async () => {
      let response: any;
      const isEnabled = await isFlagEnabled(UsersFlag.CREATE_USER);
      if (!isEnabled) {
        const id = Math.floor(Math.random() * 100);
        const dob = birthDay?.format("YYYY-MM-DD");
        const user = { id, fullName, phone, email, dob, gender, role };
        response = new MockResponse(201, user);
      }
      if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        const User = response.content;
        User.fullName = [User.firstName, User.lastName].join(" ");
        User.dob = fromTimestampToDateString(dob);
        setUsers((prevUsers: User[]) => [User, ...prevUsers]);
        toast.success("Create successful");
      }
    };

    await createUser();
    showAddModal();
    createUser();
  };

  return (
    <Modal
      title="Add a new user"
      fields={[
        {
          id: "userType",
          label: "User type",
          component: (
            <Dropdown
              id="userType"
              value={userRoleId}
              error={fieldErrors["role"]}
              options={options}
              onChange={handleDropdownChange}
              placeholder="Select one"
            />
          ),
        },
        {
          id: "userName",
          label: "Name",
          component: (
            <InputBox
              label="User name"
              name="user_name"
              value={fullName}
              error={fieldErrors["fullName"]}
              onChange={(e) => setFullName(e.target.value)}
            />
          ),
        },
        {
          id: "email",
          label: "Email address",
          component: (
            <InputBox
              name="email"
              label="Email address"
              value={email}
              error={fieldErrors["email"]}
              onChange={(e) => setEmail(e.target.value)}
            />
          ),
        },
        {
          id: "phone",
          label: "Phone",
          component: (
            <InputBox
              name="phone_number"
              label="Phone number"
              value={phone}
              error={fieldErrors["phone"]}
              onChange={(e) => setPhone(e.target.value)}
            />
          ),
        },
        {
          id: "dob",
          label: "Date of birth",
          component: (
            <DateInput
              name="date-input"
              label="Select date"
              error={fieldErrors["birthDay"]}
              value={birthDay}
              onChange={(selectedDate) => setBirthDay(selectedDate)}
            />
          ),
        },
        {
          id: "gender",
          label: "Gender",
          component: (
            <RadioButton
              name="gender"
              options={[
                { id: "MALE", label: "Male" },
                { id: "FEMALE", label: "Female" },
              ]}
              value={gender}
              onChange={setGender}
            />
          ),
        },
        {
          id: "status",
          label: "Status",
          component: (
            <Toggle
              name="status"
              on="Active"
              off="Inactive"
              value={status}
              onChange={(value: boolean) => setStatus(value)}
            />
          ),
        },
      ]}
      buttonTitle="Save"
      handleSubmit={handleSave}
      showModal={showAddModal}
    />
  );
};
