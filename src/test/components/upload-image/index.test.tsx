import { UploadImage } from '@/app/components/upload-image';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("UploadImage Component", () => {
    it("renders without crashing", () => {
        render(
            <UploadImage />
        );
        expect(screen.getByText('Public Avatar')).toBeInTheDocument();
    });

    it('displays input field for uploading new avatar', () => {
        render(<UploadImage />);
        expect(screen.getByLabelText('Upload new avatar')).toBeInTheDocument();
      });

      it('updates avatar image preview when uploading new avatar', async () => {
        render(<UploadImage />);
        const inputFile = screen.getByLabelText('Upload new avatar');
    
        
        const mockFile = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
        Object.defineProperty(inputFile, 'files', {
          value: [mockFile],
        });
    
        userEvent.upload(inputFile, mockFile);
    
        
        await waitFor(() => {
          expect(screen.getByAltText('avatar')).toBeInTheDocument();
        });
      });
})