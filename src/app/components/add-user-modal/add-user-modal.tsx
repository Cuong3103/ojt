import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal } from "@/app/components/modal/modal";
import { InputBox } from "@/app/components/input-box/input-box";
import { RadioButton } from "@/app/components/button/radio-button";
import { Toggle } from "@/app/components/toggle/toggle";
import { DateInput } from "../input-box/date-input";
import { Dayjs } from "dayjs";
import { Dropdown } from "../dropdown/dropdown";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import { MockResponse } from "@/app/services/mock-response.service";
import { toast } from "react-toastify";
import { User } from "@/types/models/user.model.type";
import { SUCCESS_HTTP_CODES } from "@/utils/constants";
import { validateUserFields } from "@/utils/validateUserUtils";

type AddUserModalProps = {
  showModal: () => void;
  setUsers: Dispatch<SetStateAction<any>>;
};

const options = [
  { value: "trainer", label: "Trainer" },
  { value: "admin", label: "Admin" },
];

export const AddUserModal: FC<AddUserModalProps> = ({
  showModal,
  setUsers,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState<Dayjs>();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRole(event.target.value);
  };

  const handleSave = async () => {
    const errors = validateUserFields({
      fullName,
      birthDay,
      email,
      phone,
      role,
    });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    const createUser = async () => {
      let response: any;
      const isEnabled = await isFlagEnabled(UsersFlag.GET_ALL);
      if (!isEnabled) {
        const id = 10;
        const dob = birthDay?.format("YYYY-MM-DD");
        const user = { id, fullName, email, dob, gender, role };
        response = new MockResponse(201, user);
      }

      if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        setUsers((prevUsers: User[]) => [response.data, ...prevUsers]);
        toast.success("Create successful");
      }
    };
    showModal();
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
              value={role}
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
              error={fieldErrors["required"]}
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
              error={fieldErrors["dob"]}
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
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
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
              onChange={(value: string) => setStatus(value)}
            />
          ),
        },
      ]}
      buttonTitle="Save"
      handleSubmit={handleSave}
      showModal={showModal}
    />
  );
};
