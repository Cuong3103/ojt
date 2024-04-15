import { WidgetTotal } from '@/app/components/dashboard/widget';
import { render, screen } from '@testing-library/react';



const mockProps = {
    icon: jest.fn(),
    title: 'Test Title',
    totalAmount: 100,
};

describe("WidgetTotal Component", () => {
    it("renders widget with correct props", () => {
        render(
            <WidgetTotal {...mockProps} />
        );

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.totalAmount.toString())).toBeInTheDocument();
        expect(mockProps.icon).toHaveBeenCalled();
    });
})