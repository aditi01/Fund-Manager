import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StockChart from '../StockChart';

describe('StockChart', () => {
  const mockData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  it('renders the chart with the given data and matches snapshot', () => {
    const { container } = render(<StockChart data={mockData} />);
    
    expect(container).toMatchSnapshot();
  });
});