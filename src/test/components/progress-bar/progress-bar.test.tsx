import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/app/components/progress-bar/progress-bar';

describe('ProgressBar Component', () => {
  it('renders correctly with "General" status', () => {
    render(<ProgressBar text="General" />);
    expect(screen.getByRole('progressbar')).toHaveStyle('width: 12.5%');
    expect(screen.getByRole('progressbar')).toHaveClass('bg-main');
  });

  it('renders correctly with "Outline" status', () => {
    render(<ProgressBar text="Outline" />);
    expect(screen.getByRole('progressbar')).toHaveStyle('width: 37.5%');
    expect(screen.getByRole('progressbar')).toHaveClass('bg-blue-main');
  });

  it('renders correctly with "Other" status', () => {
    render(<ProgressBar text="Other" />);
    expect(screen.getByRole('progressbar')).toHaveStyle('width: 62.5%');
    expect(screen.getByRole('progressbar')).toHaveClass('bg-orange-main');
  });

  it('renders correctly with "Done" status', () => {
    render(<ProgressBar text="Done" />);
    expect(screen.getByRole('progressbar')).toHaveStyle('width: 100%');
    expect(screen.getByRole('progressbar')).toHaveClass('bg-green-main');
  });
});
