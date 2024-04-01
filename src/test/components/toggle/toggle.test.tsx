import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toggle } from "@/app/components/toggle/toggle";

describe("Toggle", () => {
  it("renders the toggle component", () => {
    const handleChange = jest.fn();
    render(
      <Toggle
        on="On"
        off="Off"
        value={true}
        name="toggle"
        onChange={handleChange}
      />
    );

    expect(screen.getByLabelText("toggle")).toBeInTheDocument();
  });

  it("calls onChange with correct value when toggled", () => {
    const handleChange = jest.fn();
    render(
      <Toggle
        on="On"
        off="Off"
        value={true}
        name="toggle"
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByLabelText("toggle");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("Off")).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("On")).toBeInTheDocument();
  });
});
