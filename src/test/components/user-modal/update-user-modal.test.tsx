import { UpdateUserModal } from "@/app/components/user-modal/update-user-modal";
import { USER_ROLE } from "@/utils/constants";
import { render, screen, fireEvent } from "@testing-library/react";
import dayjs from "dayjs";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("UpdateUserModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly render update user modal", async () => {
    render(
      <UpdateUserModal
        userId={1}
        showUpdateModal={() => true}
        setData={function (): void {}}
      />
    );

    expect(await screen.findByText("Update user")).toBeInTheDocument();
    expect(await screen.findByText("User type")).toBeInTheDocument();
    expect(await screen.findByText("Name")).toBeInTheDocument();
    expect(await screen.findByText("Email address")).toBeInTheDocument();
    expect(await screen.findByText("Phone")).toBeInTheDocument();
    expect(await screen.findByText("Date of birth")).toBeInTheDocument();
    expect(await screen.findByText("Gender")).toBeInTheDocument();
    expect(await screen.findByText("Status")).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "Save" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Cancel" })
    ).toBeInTheDocument();
  });

  it("should correctly submit the form", async () => {
    render(
      <UpdateUserModal
        userId={1}
        showUpdateModal={() => true}
        setData={function (): void {}}
      />
    );

    const submitBtn = await screen.findByRole("button", { name: "Save" });
    const [userType] = await screen.findAllByRole("combobox");
    const nameInput = await screen.findByLabelText("user_name");
    const emailInput = await screen.findByLabelText("email");
    const phoneNumberInput = await screen.findByLabelText("phone_number");
    const dateInput = await screen.findByLabelText("date-input");
    const statusInput = await screen.findByLabelText("status");

    fireEvent.change(userType, { target: { value: USER_ROLE.TRAINER } });
    fireEvent.change(nameInput, { target: { value: "Change Test" } });
    fireEvent.change(emailInput, { target: { value: "changetest@gmail.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "9876543210" } });
    fireEvent.click(dateInput);
    const today = dayjs();
    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.click(statusInput);
    fireEvent.click(submitBtn);
  });

  it("Should throw an error if the input format is wrong", async () => {
    render(
      <UpdateUserModal
        userId={1}
        showUpdateModal={() => true}
        setData={function (): void {}}
      />
    );

    const submitBtn = await screen.findByRole("button", { name: "Save" });
    const [userType] = await screen.findAllByRole("combobox");
    const phoneNumberInput = await screen.findByLabelText("phone_number");

    fireEvent.change(userType, { target: { value: 1 } });
    fireEvent.change(phoneNumberInput, { target: { value: "test" } });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("Please enter a valid phone number")
    ).toBeInTheDocument();
  });
});
