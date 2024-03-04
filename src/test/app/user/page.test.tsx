import UserListPage from "../../../app/(dashboard)/(users)/users/page";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-auth/react");

describe("UserListPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly render the page", async () => {
    render(<UserListPage />);

    expect(await screen.findByText("User Management")).toBeInTheDocument();
    expect(await screen.findByText("ID")).toBeInTheDocument();
    expect(await screen.findByText("Full name")).toBeInTheDocument();
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("DOB")).toBeInTheDocument();
    expect(await screen.findByText("gender")).toBeInTheDocument();
    expect(await screen.findByText("Type")).toBeInTheDocument();
  });

  it("should correctly select size", async () => {
    render(<UserListPage />);

    expect(await screen.findByText("User Management")).toBeInTheDocument();
    expect(await screen.findByText("ID")).toBeInTheDocument();
    expect(await screen.findByText("Full name")).toBeInTheDocument();
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("DOB")).toBeInTheDocument();
    expect(await screen.findByText("gender")).toBeInTheDocument();
    expect(await screen.findByText("Type")).toBeInTheDocument();

    const [selectSize] = await screen.findAllByRole("combobox");
    fireEvent.change(selectSize, { target: { value: "20" } });
    expect(await screen.findByText("20")).toBeInTheDocument();
  });

  it("should correctly render add new user form", async () => {
    render(<UserListPage />);

    const addButton = await screen.findByText("Add User");
    fireEvent.click(addButton);

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
});
