import AppTimeFramePicker from '@/app/components/time-picker/time-frame-picker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("AppTimeFramePicker Component", () => {
    it("renders without crashing", () => {
        render(
            <AppTimeFramePicker />
        );
        expect(screen.getByPlaceholderText('--/--/----')).toBeInTheDocument();
    })

    it('displays date range picker input fields', () => {
        render(<AppTimeFramePicker />);
        const startDateInput = screen.getByLabelText('Start date');
        const endDateInput = screen.getByLabelText('End date');
        expect(startDateInput).toBeInTheDocument();
        expect(endDateInput).toBeInTheDocument();
    });


    it('updates date range values when typing', async () => {
        render(<AppTimeFramePicker />);
        const startDateInput = screen.getByLabelText('Start date');
        const endDateInput = screen.getByLabelText('End date');
        await userEvent.type(startDateInput, '01/01/2022');
        await userEvent.type(endDateInput, '02/01/2022');
        expect(startDateInput).toHaveValue('01/01/2022');
        expect(endDateInput).toHaveValue('02/01/2022');
    });
})