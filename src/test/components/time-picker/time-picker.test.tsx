import AppTimePicker from '@/app/components/time-picker/time-picker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("AppTimePicker Component", () => {
    it("renders without crashing", () => {
        render(
            <AppTimePicker />
        );
        expect(screen.getByPlaceholderText('--:--')).toBeInTheDocument();
    })

    it('displays time picker input field', () => {
        render(<AppTimePicker />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });


    it('updates time value when typing', async () => {
        render(<AppTimePicker />);
        const timeInput = screen.getByRole('textbox');
        await userEvent.type(timeInput, '13:45');
        expect(timeInput).toHaveValue('13:45');
    });
})