import { Header } from "@/app/components/header/header";
import { render, screen } from "@testing-library/react";



jest.mock('@/utils/authenticationHelper', () => ({
    getSession: jest.fn().mockResolvedValue({
      user: {
        avatarUrl: 'mock-avatar-url',
        email: 'test@example.com',
      },
    }),
  }));

  describe("Header Component", () => {
    it("renders header with user information", async () => {
        render(
            <Header/>
        );

        await screen.findByText(/test/i);

        expect(screen.getByAltText("FA logo")).toBeInTheDocument();
        expect(screen.getByAltText('unitgate')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument(); 
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    it("renders default username when email is not provided", async () => {
        jest.spyOn(require('@/utils/authenticationHelper'), 'getSession').mockResolvedValueOnce({
            user: {
              avatarUrl: 'mock-avatar-url',
            },
          });

          render(
            <Header/>
        );

        await screen.findByText(/user/i);
        expect(screen.getByText('user')).toBeInTheDocument(); // Assuming 'user' is the default name
  
    });
  })