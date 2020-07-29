import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomDatePicker } from 'components/CustomDatePicker';
import { ToggleButton } from 'components/ToggleButton';
import { RequestFormStyles } from '../index.style';

const tutors = [
  {
    id: 1,
    name: 'pniko',
    labels: [
      '$50',
      '30-min session',
      'Open to donate time'
    ]
  },
  {
    id: 2,
    name: 'wkild',
    labels: [
      '$2500',
      '30-min session'
    ]
  },
];

const timeslots = [
  { value: '09:00 AM' },
  { value: '09:30 AM' },
  { value: '10:00 AM' },
  { value: '10:30 AM' },
  { value: '11:00 AM', unavailable: true },
  { value: '11:30 AM', unavailable: true },
  { value: '12:00 AM', unavailable: true },
  { value: '12:30 AM' },
  { value: '01:00 AM' },
  { value: '01:30 AM', unavailable: true },
  { value: '02:00 AM' },
  { value: '02:30 AM' },
];

export const RequestFormStart = styled(({ className, children }) => {
  const [startDate, setStartDate] = useState(new Date());
  const CustomDateInput = ({ value, onClick }) => (
    <ToggleButton onClick={onClick}>Another Date</ToggleButton>
  );

  return (
    <div className={`${className} request-form d-flex flex-column`}>
      <div className="top-section flex-1">
        <div className={`${className}`}>
          <p className="pb-2 text-bold">Select your tutor</p>
          <div className="d-inline-flex pb-4">
            <select className="tutor-select pl-2 mr-2">
              {tutors.map((tutor) => (
                <option key={tutor.id}>{tutor.name}</option>
              ))}
            </select>
            <div className='d-inline-flex flex-items-center flex-wrap'>
              <span className="IssueLabel IssueLabel--big Label--gray mr-1 mb-1">$50</span>
              <span className="IssueLabel IssueLabel--big Label--gray mr-1 mb-1">30-min session</span>
              <span className="IssueLabel IssueLabel--big Label--gray mr-1 mb-1">
                Open to donate time
              </span>
            </div>
          </div>
          <p className="text-bold pb-2">Pick a date</p>
          <div className="pb-4">
            <ToggleButton selected>Today (Thu 7/24)</ToggleButton>
            <ToggleButton>Tomorrow (Fri 7/25)</ToggleButton>
            <CustomDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomDateInput />}
            />
          </div>
          <p className="text-bold">Pick a timeslot</p>
          <p className="pb-3">Timezone <span className='timezone'>PST</span></p>
          <div className="pb-4">
            {timeslots.map((timeslot) => (
              <ToggleButton
                key={timeslot.value}
                classes="timeslot-button"
                disabled={timeslot.unavailable}
              >
                {timeslot.value}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>
      <footer className="d-flex flex-justify-end flex-items-center pr-4">
        <button className="btn btn-outline mr-2" type="button">
          <span>Next Step</span>
        </button>
      </footer>
    </div>
  );
})`
  ${RequestFormStyles};
  .tutor-select {
    width: 275px;
    height: 2rem;
    background: #ffffff;
    border: 1px solid #e1e4e8;
    box-sizing: border-box;
    box-shadow: inset 0px 2px 0px rgba(225, 228, 232, 0.2);
    border-radius: 6px;
  }
  .timeslot-button {
    width: 100px;
  }
  .timezone {
    color: #1999DF;
    font-weight: bold;
  }
`;
