import { render, screen, fireEvent } from '@testing-library/react';
import StockSelector from '../StockSelector';
import userEvent from '@testing-library/user-event';

describe('StockSelector', () => {
  const stocks = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'TSLA'];
  const selectedStocks = ['AAPL', 'MSFT'];
  const mockOnChange = jest.fn();

  it('renders the StockSelector', () => {
    render(<StockSelector stocks={stocks} selectedStocks={selectedStocks} onChange={mockOnChange} />);
    
    // Check if the select component is rendered
    const selectElement = screen.getByTestId('select-stock');
    expect(selectElement).toBeInTheDocument();

    fireEvent.mouseDown(selectElement);
    // Check if the options are rendered
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  it('calls onChange with correct stocks when selection changes', async () => {
    render(<StockSelector stocks={stocks} selectedStocks={selectedStocks} onChange={mockOnChange} />);
    
    const selectElement = screen.getByRole('combobox');
    userEvent.click(selectElement);

    const unselectedOption = await screen.findByText('AMZN');
    await userEvent.click(unselectedOption);
  });
});
