import { SearchInput } from '@/app/components/createDate/search-input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('SearchInput', () => {
    it('renders without crashing', () => {
        render(
            <SearchInput />
        );
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('displays input field with correct placeholder', () => {
        render(<SearchInput />);
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('allows typing in the input field', () => {
        render(<SearchInput />);
        const inputField = screen.getByPlaceholderText('Search');
        userEvent.type(inputField, 'search text');
        expect(inputField).toHaveValue('search text');
    });
});