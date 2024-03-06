import { render, screen, fireEvent } from "@testing-library/react";
import { Detail } from "@/app/components/syllabus-detail/detail";

describe('Detail Component', () => {
  test('it should toggle status from Online to Offline and vice versa', () => {
    render(<Detail />);
    const button = screen.getByRole('button', { name: /Online/i });
    expect(button).toHaveClass('online');

    fireEvent.click(button);
    expect(button).toHaveClass('offline');
    expect(button).toHaveTextContent('Offline');

    fireEvent.click(button);
    expect(button).toHaveClass('online');
    expect(button).toHaveTextContent('Online');
  });
});
