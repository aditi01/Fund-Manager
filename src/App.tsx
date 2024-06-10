import { useState, useEffect } from 'react';
import StockSelector from './components/StockSelector/StockSelector';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import StockChart from './components/StockChart/StockChart';
import CandlestickChart from './components/CandleStickChart/CandleStickChart';
import UserProfile from './components/UserProfile/UserProfile';
import { fetchStockData } from './api/StockApi';
import { userData } from './api/UserProfileApi';
import { Select, Row, Col, Card, Divider, Avatar, Space, Tabs, TabsProps, notification, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './App.css'

const { Option } = Select;

const App = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['AMZN']);
  const [dateRange, setDateRange] = useState<[string, string]>(['2022-01-01', '2022-12-31']);
  const [priceType, setPriceType] = useState<string>('close');
  const [chartData, setChartData] = useState<any>({});
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [candleData, setCandleData] = useState<any>({});
  const [isShowPriceDropdown, setIsShowPriceDropdown] = useState<boolean>(true);
  const [stockResults, setStockResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const openNotification = (message: string, description: string) => {
    notification.error({
      message: message,
      description: description,
      placement: 'topRight',
    });
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Line Graph',
      children: chartData.labels && <StockChart data={chartData} />,
    },
    {
      key: '2',
      label: 'Candle Graph',
      children: <CandlestickChart chartData={candleData} />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await fetchStockData(selectedStocks, dateRange[0], dateRange[1]);
        setStockResults(results);
      } catch (error) {
        console.error('Error fetching data:', error);
        openNotification('Error Fetching Data', 'Failed to fetch stock data. Please try in a minute.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedStocks, dateRange]);

  useEffect(() => {
    if (stockResults.length > 0) {
      const groupedData = groupStockResults(stockResults);
      const uniqueDates = getUniqueDates(stockResults);

      const datasets = Object.keys(groupedData).map((ticker, index) => {
        const color = `hsl(${(index * 360) / Object.keys(groupedData).length}, 70%, 50%)`;
        const data = uniqueDates.map(date => {
          const entry = groupedData[ticker].find((entry: any) => entry.date.toISOString().split('T')[0] === date);
          return entry ? entry[priceType] : null;
        });

        return {
          label: `${ticker} ${priceType.charAt(0).toUpperCase() + priceType.slice(1)}`,
          data: data,
          fill: false,
          borderColor: color
        };
      });

      const dataForChart = {
        labels: uniqueDates,
        datasets: datasets
      };

      setChartData(dataForChart);
      setCandleData(stockResults);
    }
  }, [stockResults, priceType]);

  const groupStockResults = (results: any[]) => {
    const groupedData: { [ticker: string]: any[] } = {};
    results.forEach((entry: any) => {
      if (!groupedData[entry.ticker]) {
        groupedData[entry.ticker] = [];
      }
      groupedData[entry.ticker].push(entry);
    });
    return groupedData;
  };

  const getUniqueDates = (results: any[]) => {
    return Array.from(new Set(results.map((entry: { date: Date }) => entry.date.toISOString().split('T')[0]))).sort();
  };

  const setShowProfile = () => {
    setShowDrawer(!showDrawer)
  };

  const onChange = (key: string) => {
    setIsShowPriceDropdown(key !== '2');
  };

  const renderPriceSelect = () => (
    <Select value={priceType} onChange={setPriceType} style={{ width: '100%' }}>
      <Option value="open">Open Prices</Option>
      <Option value="high">High Prices</Option>
      <Option value="low">Low Prices</Option>
      <Option value="close">Close Prices</Option>
    </Select>
  );

  return (
    <div className='stock-app'>
      <Card>
      <Row align="middle" justify="space-between">
        <Col span={8}></Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <h3 className='app-header'>Fund Manager</h3>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space wrap size={16} onClick={setShowProfile} className='user-profile'>
            <Avatar size={64} icon={<UserOutlined />} />
            <div>John Doe</div>
          </Space>
          <UserProfile isOpen={showDrawer} onClose={setShowProfile} data={userData} />
        </Col>
      </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={5}>
            <StockSelector stocks={['AAPL', 'MSFT', 'AMZN', 'BCAT', 'PDS', 'FB', 'GOOGL', 'TSLA']} selectedStocks={selectedStocks} onChange={setSelectedStocks} />
          </Col>
          <Col span={5}>
            <DateRangePicker startDate={dateRange[0]} endDate={dateRange[1]} onChange={setDateRange} />
          </Col>
          <Col span={12}>
            <Row justify="end" gutter={[16, 16]}>
              <Col span={6} className='select-component'>
                {isShowPriceDropdown && renderPriceSelect()}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
          {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Spin size="large" />
              </div>
            ) : (
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;
