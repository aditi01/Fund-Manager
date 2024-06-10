import { Select } from 'antd';

const { Option } = Select;

interface IProps {
  stocks: string[],
  selectedStocks: string[],
  onChange: (stocks: string[]) => void
}

const StockSelector = (props: IProps) => {
  const { stocks, selectedStocks, onChange } = props
  const handleChange = (e: any) => {
    const value = e.slice();
    if (value.length <= 3) {
      onChange(value);
    }
  };

  return (
    <Select
      data-testid="select-stock"
      mode="multiple"
      defaultValue={selectedStocks}
      style={{ width: '100%' }}
      placeholder="Select stocks"
      onChange={handleChange}
    >
      {stocks.map(stock => (
        <Option data-testid="select-option" key={stock} value={stock} disabled={selectedStocks.length >= 3 && !selectedStocks.includes(stock)}>
          {stock}
        </Option>
      ))}
    </Select>
  );
};

export default StockSelector;
