// StockSelector.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockSelector from '../StockSelector';

describe('StockSelector', () => {
  const stocks = ['AAPL', 'MSFT', 'AMZN', 'FB', 'GOOGL', 'TSLA'];
  const selectedStocks = ['AAPL', 'MSFT'];
  const mockOnChange = jest.fn();

  it('renders correctly and matches snapshot', () => {
    const { container } = render(
      <StockSelector stocks={stocks} selectedStocks={selectedStocks} onChange={mockOnChange} />
    );

    expect(container).toMatchSnapshot();
  });
});
