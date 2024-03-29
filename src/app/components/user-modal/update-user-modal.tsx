import { RadioButton } from "@/app/components/button/radio-button";
import { InputBox } from "@/app/components/input-box/input-box";
import { Modal } from "@/app/components/modal/modal";
import { Toggle } from "@/app/components/toggle/toggle";
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
import { getUserByUUID, updateProfile } from "@/services/users/index";
import { fromTimestampToDateString } from "@/utils/formatUtils";

type UpdateUserModalProps = {
  userUUID: any;
  showUpdateModal: () => void;
  setData: Dispatch<SetStateAction<any>>;
};

const options = [
  { value: USER_ROLE.TRAINER, label: "Trainer" },
  { value: USER_ROLE.ADMIN, label: "Admin" },
];

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  userUUID,
  showUpdateModal,
  setData,
}) => {
  const [userId, setUserId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState<Dayjs>();
  const [gender, setGender] = useState<boolean>();
  const [status, setStatus] = useState<boolean>(true);
  const [userRoleId, setUserRoleId] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const getCurrentUser = async (uuid?: string) => {
    if (!uuid) throw new Error("UUID is not correct");

    const response = await getUserByUUID(uuid);
    return response.content;
  };

  useEffect(() => {
    const fetchUserByUUID = async () => {
      const currentUser = await getCurrentUser(userUUID);
      setUserId(currentUser.id);
      setUserRoleId(currentUser.userRoleId);
      setFullName(currentUser.firstName + " " + currentUser.lastName);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setBirthDay(dayjs(currentUser.dob));
      setGender(currentUser.gender);
      setStatus(currentUser.status);
    };
    fetchUserByUUID();
  }, []);
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
      toast.error("There is something wrong");
      return;
    }

    const editUser = async () => {
      const password = "pass";
      const dob = birthDay?.unix();
      const names = fullName.split(" ");
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");
      const user = {
        id: userId,
        uuid: userUUID,
        email: email,
        firstName,
        lastName,
        password,
        phone,
        dob,
        gender,
        userRoleId,
        status,
      };
      const response = await updateProfile(user, userId);
      if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        setData((prevUsers: User[]) => {
          const updatedUsers = prevUsers.map((user) => {
            if (user.id === response.content.id) {
              const {
                id,
                uuid,
                firstName,
                lastName,
                dob,
                gender,
                userRoleId,
                status,
              } = response.content;
              return {
                id,
                uuid,
                dob: fromTimestampToDateString(dob),
                gender: gender ? "male" : "female",
                email,
                phone,
                fullName: firstName + " " + lastName,
                userRoleId,
                status,
              };
            } else {
              return user;
            }
          });

          return updatedUsers;
        });
        toast.success("Update successful");
      }
    };

    await editUser();
    showUpdateModal();
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
              readOnly={true}
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
              onChange={(value: boolean) => setStatus(value)}
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
