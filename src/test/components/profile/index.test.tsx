import { ProfileForm } from '@/app/components/profile';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const mockProps = {
    isDisabled: false,
    currentUser: {
        id: 1,
        uuid: "some-uuid",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        gender: "male",
        phone: "1234567890",
        status: true,
        userRoleId: 123,
    },
    handleUpdateProfile: jest.fn(),
    onClickEdit: jest.fn(),
    setCurrentUser: jest.fn(),
};


describe("ProfileForm Component", () => {
    it("renders profile form with correct inputs and buttons", () => {
        render(
            <ProfileForm  {...mockProps} />
        );
        expect(screen.getByText('Edit profile')).toBeInTheDocument();
        expect(screen.getByText('This information will appear on your profile.')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
        expect(screen.getByText('Male')).toBeInTheDocument();

        const editButton = screen.getByText("Edit");
        expect(editButton).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();

        userEvent.click(editButton);
        expect(mockProps.onClickEdit).toHaveBeenCalledTimes(1);
    });

    it("disables inputs when isDisabled is true", () => {
        render(
            <ProfileForm  {...mockProps} isDisabled={true} />
        );
        expect(screen.getByDisplayValue('John')).toBeDisabled();
        expect(screen.getByDisplayValue('Doe')).toBeDisabled();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeDisabled();
        expect(screen.getByDisplayValue('1234567890')).toBeDisabled();
        expect(screen.getByText('Male')).toBeInTheDocument();

        const cancelButton = screen.getByText('Cancel');
        expect(cancelButton).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();

        userEvent.click(cancelButton);
        expect(mockProps.onClickEdit).toHaveBeenCalledTimes(1);
    });

    it('calls setCurrentUser with updated gender when selecting a gender', () => {
        render(<ProfileForm {...mockProps} />);
        
        const genderSelect = screen.getByLabelText('Gender');
        userEvent.selectOptions(genderSelect, 'female');
    
        expect(mockProps.setCurrentUser).toHaveBeenCalledWith({
          ...mockProps.currentUser,
          gender: 'female',
        });
      });
    
      it('calls setCurrentUser with updated value when changing other inputs', () => {
        render(<ProfileForm {...mockProps} />);
    
        const firstNameInput = screen.getByLabelText('First name');
        userEvent.type(firstNameInput, 'Jane');
    
        expect(mockProps.setCurrentUser).toHaveBeenCalledWith({
          ...mockProps.currentUser,
          firstName: 'Jane',
        });
      });
});

