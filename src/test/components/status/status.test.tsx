import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Status } from '@/app/components/status/status';

describe('Status component', () => {
  test('renders correctly', () => {
    render(<Status />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  test('toggles checkbox states', async () => {
    render(<Status />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    await userEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });
});
