import React from "react";
import { render, screen } from "@testing-library/react";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";

describe('SyllabusCard', () => {
  it('renders correctly', () => {
    render(<SyllabusCard />);
    expect(screen.getByText('Linux')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('LIN v2.0')).toBeInTheDocument();
    expect(screen.getByText('4 days (12 hours)')).toBeInTheDocument();
    expect(screen.getByText('Modified on 23/07/2022 by Johny Deep')).toBeInTheDocument();
  });
});
