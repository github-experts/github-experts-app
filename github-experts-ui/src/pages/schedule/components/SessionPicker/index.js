import React from 'react';
import styled from 'styled-components';
import { ToggleButton } from 'components/ToggleButton';

const tutors = [
  'pniko',
  'wkild'
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
  { value: '02:30 AM' }
];

export const SessionPicker = styled(({ className, children }) => {
  return (
    <div className={`${className} p-6`}>
      <p className='pb-2'>Select your tutor</p>
      <div className='pb-4'>
        <select className='tutor-select mr-2'>
          {tutors.map((tutor) =>
            <option>{tutor}</option>
          )}
        </select>
        <span className='Label Label--gray mr-1'>$50</span>
        <span className='Label Label--gray mr-1'>30-min session</span>
        <span className='Label Label--gray mr-1'>Open to donate time</span>
      </div>
      <p className='pb-2'>Pick a date</p>
      <div className='pb-4'>
        <ToggleButton selected>Today (Thu 7/24)</ToggleButton>
        <ToggleButton>Tomorrow (Fri 7/25)</ToggleButton>
        <ToggleButton>Another Date</ToggleButton>
      </div>
      <p className='pb-2'>Pick a timeslot</p>
      <div className='pb-4'>
        {timeslots.map((timeslots) =>
          <ToggleButton classes='timeslot-button' disabled={timeslots.unavailable} >{timeslots.value}</ToggleButton>
        )}
      </div>
    </div>
  );
})`
  .tutor-select {
    width: 275px;
    height: 2rem;
    background: #FFFFFF;
    border: 1px solid #E1E4E8;
    box-sizing: border-box;
    box-shadow: inset 0px 2px 0px rgba(225, 228, 232, 0.2);
    border-radius: 6px;
  }
  .timeslot-button {
    width: 100px;
  }
`