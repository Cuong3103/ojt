import { RadioButton } from "@/app/components/button/radio-button";
import { InputBox } from "@/app/components/input-box/input-box";
import { Modal } from "@/app/components/modal/modal";
import { Toggle } from "@/app/components/toggle/toggle";
import { MockResponse } from "@/app/services/mock-response.service";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import { User } from "@/types/models/user.model.type";
import { SUCCESS_HTTP_CODES, USER_ROLE } from "@/utils/constants";
import { validateUserFields } from "@/utils/validateUserUtils";
import dayjs, { Dayjs } from "dayjs";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { Dropdown } from "../dropdown/dropdown";
import { DateInput } from "../input-box/date-input";

type UpdateUserModalProps = {
  data: any;
  showUpdateModal: () => void;
  setData: Dispatch<SetStateAction<any>>;
};

const options = [
  { value: USER_ROLE.TRAINER, label: "Trainer" },
  { value: USER_ROLE.ADMIN, label: "Admin" },
];

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  data,
  showUpdateModal,
  setData,
}) => {
  const [id, setId] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState<Dayjs>();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    if (data) {
      data.map((userData: any) => {
        setId(userData.id);
        setFullName(userData.fullName);
        setEmail(userData.email);
        setPhone(userData.phone);
        setBirthDay(dayjs(userData.dob));
        setGender(userData.gender);
        setStatus(userData.status);
        setRole(userData.role);
        setFieldErrors({});
      });
    }
  }, [data]);

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

    const updateUser = async () => {
      let response: any;
      const isEnabled = await isFlagEnabled(UsersFlag.UPDATE_USER);
      if (!isEnabled) {
        const dob = birthDay?.format("YYYY-MM-DD");
        const user = { id, fullName, phone, email, dob, gender, role };
        response = new MockResponse(200, user);
      }

      if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        setData((prevUsers: User[]) => {
          const updatedUsers = prevUsers.map((user) => {
            if (user.id === response.data.id) {
              return response.data;
            } else {
              return user;
            }
          });

          return updatedUsers;
        });
        toast.success("Update successful");
      }
    };

    showUpdateModal();
    updateUser();
  };

  return (
    <Modal
      title="Update user"
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
            <>
              <InputBox
                label="User name"
                name="user_name"
                value={fullName}
                error={fieldErrors["name"]}
                onChange={(e) => setFullName(e.target.value)}
              />
            </>
          ),
        },
        {
          id: "email",
          label: "Email address",
          component: (
            <InputBox
              name="email"
              label="Email address"
              defaultValue={email}
              error={fieldErrors["email"]}
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
      showModal={showUpdateModal}
    />
  );
};
