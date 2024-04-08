import { RadioButton } from "@/app/components/button/radio-button";
import { InputBox } from "@/app/components/input-box/input-box";
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
import { Modal } from "../modal/modal";
import Button from "../button/button";
import { comma } from "postcss/lib/list";

type AddUserModalProps = {
  showAddModal: () => void;
  setUsers: Dispatch<SetStateAction<any>>;
};

const optionsEncoding = [
  //   { value: UTF8ToString, label: "UTF-8" },
  //   { value: UTF16ToString, label: "UTF-16" },
  //   { value: UTF32ToString, label: "UTF-32" },
];

const optionsSeparator = [
  //   { value: comma, label: "comma" },
  //   { value: comma, label: "semicolon" },
];

export const ImportTrainingProgram: FC<AddUserModalProps> = ({ showAddModal, setUsers }) => {
  const [file, setFile] = useState("");
  const [encoding, setEncoding] = useState("");
  const [separator, stetSeparator] = useState();
  const [template, setTemplate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState<Dayjs>();
  const [gender, setGender] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(true);
  const [userRoleId, setUserRoleId] = useState<number>(1);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRoleId(parseInt(event.target.value));
  };

  const handleImport = async () => {
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
      const isEnabled = true;
      const password = "pass";
      const dob = birthDay?.unix();
      const names = fullName.split(" ");
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");
      const user = {
        firstName,
        lastName,
        password,
        phone,
        email,
        dob,
        gender,
        userRoleId,
      };
      if (isEnabled) {
        response = await addUser(user as any);
      } else {
        response = new MockResponse(201, user);
      }
      if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        const User = response.content;
        User.fullName = [User.firstName, User.lastName].join(" ");
        setUsers((prevUsers: User[]) => [User, ...prevUsers]);
        toast.success("Create successful");
      }
    };
    await createUser();
    showAddModal();
  };

  return (
    <Modal
      title="Import Training Program"
      fields={[
        {
          id: "userType",
          label: "File (csv)",
          component: (
            <Button
              className={
                "h-[38px] px-[10px] w-fit text-white bg-primary-color rounded-[10px] hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
              }
              title="Select"
            />
          ),
        },
        {
          id: "encodingType",
          label: "Encoding type",
          component: (
            <Dropdown
              id="encodingType"
              value={userRoleId}
              error={fieldErrors["role"]}
              options={optionsEncoding}
              onChange={handleDropdownChange}
              placeholder="Auto detect"
            />
          ),
        },
        {
          id: "columnSeparator",
          label: "Column separator",
          component: (
            <Dropdown
              id="encodingType"
              value={userRoleId}
              error={fieldErrors["role"]}
              options={optionsSeparator}
              onChange={handleDropdownChange}
              placeholder="Comma"
            />
          ),
        },
        {
          id: "importTemplate",
          label: "Import Template",
          component: <Button title="Download" />,
        },
        {
          id: "scanning",
          label: "Scanning",
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
          id: "duplicate",
          label: "Duplicate handle",
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
      buttonTitle="Import"
      handleSubmit={handleImport}
      showModal={showAddModal}
    />
  );
};
