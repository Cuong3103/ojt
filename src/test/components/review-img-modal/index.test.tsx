import { PreviewImgModal } from '@/app/components/preview-img-modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const mockProps = {
  image: 'mock-image-url',
  showModal: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('PreviewImgModal', () => {
  it('renders modal with image container', () => {
    render(<PreviewImgModal {...mockProps} />);

    const imageElement = screen.getByAltText('text');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProps.image);
    expect(imageElement).toHaveAttribute('width', '10000');
    expect(imageElement).toHaveAttribute('height', '10000');

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toBeInTheDocument();

    userEvent.click(confirmButton);

    expect(mockProps.showModal).toHaveBeenCalledTimes(1);
    expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
  });

});