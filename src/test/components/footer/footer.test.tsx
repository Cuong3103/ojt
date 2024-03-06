import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "@/app/components/footer/footer";

describe("Footer component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Copyright © 2022 - All right reserved/i)).toBeInTheDocument();
  });
});
