import { AddUserModal } from "@/app/components/user-modal/add-user-modal";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("AddUserModal", () => {
  const postSpy = jest.spyOn(axios, "post");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly render add new user modal", async () => {
    render(
      <AddUserModal showAddModal={() => true} setUsers={function (): void {}} />
    );

    expect(await screen.findByText("Add a new user")).toBeInTheDocument();
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

  it("should correctly cancel add new user form", async () => {
    render(
      <AddUserModal showAddModal={() => true} setUsers={function (): void {}} />
    );

    expect(await screen.findByText("Add a new user")).toBeInTheDocument();
    fireEvent.click(await screen.findByRole("button", { name: "Cancel" }));
  });

  it("should correctly submit the form", async () => {
    render(
      <AddUserModal showAddModal={() => true} setUsers={function (): void {}} />
    );

    const submitBtn = await screen.findByRole("button", { name: "Save" });
    const [userType] = await screen.findAllByRole("combobox");
    const nameInput = await screen.findByLabelText("user_name");
    const emailInput = await screen.findByLabelText("email");
    const phoneNumberInput = await screen.findByLabelText("phone_number");
    const dateInput = await screen.findByLabelText("date-input");
    const statusInput = await screen.findByLabelText("status");

    fireEvent.change(userType, { target: { value: "admin" } });
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(phoneNumberInput, { target: { value: "1234567899" } });
    fireEvent.click(dateInput);
    const today = dayjs();
    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.click(statusInput);
    fireEvent.click(submitBtn);
  });

  it("Should throw an error if the input format is wrong", async () => {
    render(
      <AddUserModal showAddModal={() => true} setUsers={function (): void {}} />
    );

    const submitBtn = await screen.findByRole("button", { name: "Save" });
    const [userType] = await screen.findAllByRole("combobox");
    const emailInput = await screen.findByLabelText("email");
    const phoneNumberInput = await screen.findByLabelText("phone_number");

    fireEvent.change(userType, { target: { value: "admin" } });
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(phoneNumberInput, { target: { value: "test" } });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter a valid phone number")
    ).toBeInTheDocument();
    expect(await screen.findByText("birthDay is required")).toBeInTheDocument();
  });
});
