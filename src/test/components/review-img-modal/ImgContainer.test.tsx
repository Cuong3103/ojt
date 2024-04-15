
import { ImageContainer } from '@/app/components/preview-img-modal/ImageContainer';
import { render, screen } from '@testing-library/react';


const mockProps = {
    image: 'mock-image-url',
  altText: 'Mock Alt Text',
  width: 200,
  height: 200,
}

describe('ImageContainer', () => {
    it('renders image container with correct props', () => {
      render(<ImageContainer {...mockProps} />);
  
      const imageElement = screen.getByAltText(mockProps.altText);
  
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', mockProps.image);
      expect(imageElement).toHaveAttribute('width', mockProps.width.toString());
      expect(imageElement).toHaveAttribute('height', mockProps.height.toString());
    });
  
    
  });