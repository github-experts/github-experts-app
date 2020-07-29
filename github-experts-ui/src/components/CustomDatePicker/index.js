import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ToggleButton } from 'components/ToggleButton';
import CalendarIcon from 'assets/calendar-icon.svg';
import ChevronDown from 'assets/chevron-down.svg';

import 'react-datepicker/dist/react-datepicker.css';

export const CustomDatePicker = styled(({ className }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      className={className}
      calendarClassName={className}
      popperClassName={className}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={
        <ToggleButton>
          <div className="d-flex flex-items-center">
            <img src={CalendarIcon} alt="" className="pr-2" />
            Another Date
            <img src={ChevronDown} alt="" className="pl-2" />
          </div>
        </ToggleButton>
      }
      minDate={new Date()}
    />
  );
})`
  &.react-datepicker {
    background: #ffffff;
    border: 1px solid #e1e4e8;
    box-shadow: 0px 4px 12px rgba(27, 31, 35, 0.15);
    border-radius: 6px;
  }
  &.react-datepicker-popper[data-placement^='bottom'] {
    margin-top: 0;
  }
  .react-datepicker__header {
    background-color: #fff;
    border: none;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__day-name {
    color: #afafaf;
    font-size: 9px;
    line-height: 11px;
    width: 24px;
  }
  .react-datepicker__current-month {
    text-align: left;
    padding-left: 16px;
    color: #474747;
    font-weight: normal;
    margin-bottom: 8px;
  }
  .react-datepicker__navigation:focus {
    outline: 1px dotted transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
  }
  .react-datepicker__navigation--previous {
    left: revert;
    right: 40px;
  }
  .react-datepicker__day {
    font-size: 9px;
    border-radius: 50%;
    border: 1px solid #22a7e6;
    background-color: #def4ff;
    color: #22a7e6;
    width: 27px;
    height: 27px;
    line-height: 25px;
    font-weight: bold;
  }
  .react-datepicker__day--disabled {
    cursor: default;
    color: #ccc;
    border: none;
    background: none;
  }
  .react-datepicker__day--selected {
    border: 1px solid #22a7e6;
    background-color: #22a7e6;
    color: #fff;
  }
`;
