import InputBox from '@/app/components/createDate/input-box';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("InputBox Component", () => {
    it("renders without crashing", () => {
        render(
            <InputBox />
        );
        expect(screen.getByPlaceholderText('Search by...')).toBeInTheDocument();
    });

    it('displays input field with correct placeholder', () => {
        render(<InputBox />);
        expect(screen.getByPlaceholderText('Search by...')).toBeInTheDocument();
      });
    
      it('displays form alert when input field is empty and blurred', () => {
        render(<InputBox />);
        const inputField = screen.getByPlaceholderText('Search by...');
        inputField.focus();
        inputField.blur();
        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });
    
      it('does not display form alert when input field is not empty and blurred', () => {
        render(<InputBox />);
        const inputField = screen.getByPlaceholderText('Search by...');
        userEvent.type(inputField, 'some text');
        inputField.blur();
        expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
      });
})