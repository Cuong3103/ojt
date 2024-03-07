import { Tab } from "@/app/components/syllabus-tab/tab";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Tab component", () => {
  test("it should render the component", () => {
    render(<Tab />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  test("it should change to General tab when clicked", () => {
    render(<Tab />);
    fireEvent.click(screen.getByLabelText("General"));
    expect(screen.getByLabelText("General")).toBeChecked();
  });

  test("it should change to Outline tab when clicked", () => {
    render(<Tab />);
    fireEvent.click(screen.getByLabelText("Outline"));
    expect(screen.getByLabelText("Outline")).toBeChecked();
  });

  test("it should change to Training material tab when clicked", () => {
    render(<Tab />);
    fireEvent.click(screen.getByLabelText("Training material"));
    expect(screen.getByLabelText("Training material")).toBeChecked();
  });
});
