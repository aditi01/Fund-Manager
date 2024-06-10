import React from 'react';
import { render } from '@testing-library/react';
import DateRangePicker from '../DateRangePicker';
import dayjs from 'dayjs';

jest.mock('antd', () => {
  const RangePicker = (props: any) => (
    <div data-testid="range-picker">
      {props.defaultValue.map((date: any) => (
        <span key={date.toString()}>{date.toString()}</span>
      ))}
    </div>
  );
  return { DatePicker: { RangePicker } };
});

describe('DateRangePicker Snapshot Test', () => {
  it('renders correctly with given props', () => {
    const tree = render(
      <DateRangePicker
        startDate={dayjs('2023-01-01').format()}
        endDate={dayjs('2023-12-31').format()}
        onChange={jest.fn()}
      />
    );

    expect(tree).toMatchSnapshot();
  });
});