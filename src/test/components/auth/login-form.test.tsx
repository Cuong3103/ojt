import { LoginForm } from "@/app/components/auth/login-form";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react");

describe("LoginForm", () => {
  const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
  const mockUser = {
    email: "<FAKE_EMAIL>",
    password: "<FAKE_PASSWORD>",
  };

  beforeEach(() => {
    mockSignIn.mockResolvedValue({ status: 200, ok: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("submits the login form with username and password", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: mockUser.email },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockUser.password },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    // FIXME: Update the test later
    // await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith("credentials"));
  });
});
