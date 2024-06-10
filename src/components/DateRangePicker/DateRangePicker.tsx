import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface IProps {
  startDate: string,
  endDate: string,
  onChange: (dates: [string, string]) => void
}

const DateRangePicker = (props: IProps) => {
  const { startDate, endDate, onChange } = props

  return (
    <>
    <RangePicker
      defaultValue={[dayjs(startDate), dayjs(endDate)]}
      onChange={(date, dateStrings) => onChange([dateStrings[0], dateStrings[1]])}
     />
    </>
  );
};

export default DateRangePicker;
