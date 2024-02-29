import { Modal } from "@/app/components/modal/modal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";

describe("Modal", () => {
  it("should render the modal form", async () => {
    render(<Modal title="test" />);

    expect(await screen.findByText("Name")).toBeInTheDocument();
    expect(await screen.findByText("Output standard")).toBeInTheDocument();
    expect(await screen.findByText("Training time")).toBeInTheDocument();
    expect(await screen.findByText("Method")).toBeInTheDocument();
    expect(await screen.findByText("Delivery type")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Create" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Create" })
    ).toBeInTheDocument();
  });

  it("should correcly select delivery type", async () => {
    render(<Modal title="test" />);

    fireEvent.change(screen.getByRole("combobox"));

    expect(await screen.findByText("Option 1")).toBeInTheDocument();
  });
});
