import axios, { AxiosResponse } from 'axios';
import { fetchStockData } from '../StockApi';

jest.mock('axios');

describe('fetchStockData function', () => {
  const mockResponse = {
    data: {
      results: [
        { t: 1623225600, o: 100, h: 110, l: 90, c: 105, v: 100000 },
        { t: 1623312000, o: 105, h: 115, l: 95, c: 110, v: 120000 },
      ],
      ticker: 'AAPL',
    },
  };

  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse as AxiosResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches stock data for given symbols and date range', async () => {
    const symbols = ['AAPL', 'MSFT'];
    const from = '2022-01-01';
    const to = '2022-01-02';
    const API_KEY = 'TEST'

    const expectedRequests = symbols.map(symbol =>
      `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${API_KEY}`
    );

    await fetchStockData(symbols, from, to);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenNthCalledWith(1, expectedRequests[0]);
    expect(axios.get).toHaveBeenNthCalledWith(2, expectedRequests[1]);
  });

  it('combines and transforms response data correctly', async () => {
    const symbols = ['AAPL'];
    const from = '2022-01-01';
    const to = '2022-01-02';

    const result = await fetchStockData(symbols, from, to);

    expect(result).toEqual([
      {
        timestamp: 1623225600,
        open: 100,
        high: 110,
        low: 90,
        close: 105,
        ticker: 'AAPL',
        volume: 100000,
        date: new Date(1623225600 * 1000),
      },
      {
        timestamp: 1623312000,
        open: 105,
        high: 115,
        low: 95,
        close: 110,
        ticker: 'AAPL',
        volume: 120000,
        date: new Date(1623312000 * 1000),
      },
    ]);
  });
});
