// UserProfile.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../UserProfile';

describe('UserProfile', () => {
  const mockData = {
    name: 'John Doe',
    id: '12345',
    email: 'john.doe@example.com',
    contactNumber: '123-456-7890',
    managedFunds: [
      {
        fundId: '1',
        fundName: 'Fund A',
        fundType: 'Equity',
        inceptionDate: '2020-01-01',
        assetsUnderManagement: '100M',
        performance: {
          '1year': '10%',
          '3years': '30%',
          '5years': '50%',
        },
        topHoldings: [
          { stockSymbol: 'AAPL', percentage: '5%' },
          { stockSymbol: 'MSFT', percentage: '3%' },
        ],
      },
      {
        fundId: '2',
        fundName: 'Fund B',
        fundType: 'Bond',
        inceptionDate: '2019-01-01',
        assetsUnderManagement: '200M',
        performance: {
          '1year': '5%',
          '3years': '15%',
          '5years': '25%',
        },
        topHoldings: [
          { stockSymbol: 'GOOGL', percentage: '6%' },
          { stockSymbol: 'TSLA', percentage: '4%' },
        ],
      },
    ],
  };

  it('renders the user profile with the given data and matches snapshot', () => {
    const { container } = render(
      <UserProfile isOpen={true} data={mockData} onClose={jest.fn()} />
    );

    expect(container).toMatchSnapshot();
  });
});
