import { render, screen, fireEvent } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import { LogoutButton } from '@/app/components/button/logout-button';

jest.mock('next-auth/react');

describe('LogoutButton', () => {
  it('calls signOut when clicked', () => {
    render(<LogoutButton />);
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
