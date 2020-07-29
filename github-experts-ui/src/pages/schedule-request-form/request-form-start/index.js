import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomDatePicker } from 'components/CustomDatePicker';
import { ToggleButton } from 'components/ToggleButton';
import { RequestFormStyles } from '../index.style';
import moment from 'moment';
import { Link } from 'react-router-dom';

const tutors = [
  {
    id: '1',
    name: 'pniko',
    labels: ['$50', '30-min session', 'Open to donate time'],
  },
  {
    id: '2',
    name: 'wkild',
    labels: ['$2500', '30-min session'],
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

const shortDateOptions = { weekday: 'short', month: 'numeric', day: 'numeric' };

export const RequestFormStart = styled(({ className, children }) => {
  const today = moment().startOf('day');
  const tomorrow = today.add(1, 'days');

  const [activeTutor, setActiveTutor] = useState(tutors[0]);
  const [activeTimeslot, setActiveTimeslot] = useState(null);
  const [days, setDays] = useState([
    {
      id: 'today',
      name:
        'Today (' +
        today.toDate().toLocaleDateString(undefined, shortDateOptions) +
        ')',
      value: today.toDate(),
    },
    {
      id: 'tomorrow',
      name:
        'Tomorrow (' +
        tomorrow.toDate().toLocaleDateString(undefined, shortDateOptions) +
        ')',
      value: tomorrow.toDate(),
    },
  ]);
  const [activeDay, setActiveDay] = useState(days[0]);

  function handleTutorChanged(event) {
    let tutor = tutors.find((t) => t.id === event.target.value);
    setActiveTutor(tutor);
  }

  function handleAnotherDate(date) {
    date.setHours(0, 0, 0, 0);

    let day = days.find((d) => d.value.getTime() === date.getTime());

    if (!day) {
      // Remove 'other' date if it exists
      let newDays = [...days].filter((d) => d.id !== 'other');

      // Add a new 'other' date
      newDays.push({
        id: 'other',
        name: date.toLocaleDateString(undefined, shortDateOptions),
        value: date,
      });
      setDays(newDays);

      day = newDays[2];
    }

    setActiveDay(day);
  }

  return (
    <div className={`${className} request-form d-flex flex-column`}>
      <div className="top-section flex-1">
        <div className={`${className}`}>
          <p className="pb-2 text-bold">Select your tutor</p>
          <div className="d-inline-flex pb-4">
            <select
              className="tutor-select pl-2 mr-2"
              onChange={handleTutorChanged}
            >
              {tutors.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </option>
              ))}
            </select>
            <div className="d-inline-flex flex-items-center flex-wrap">
              {activeTutor.labels.map((label) => (
                <span
                  key={label}
                  className="IssueLabel IssueLabel--big Label--gray mr-1 mb-1"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <p className="text-bold pb-2">Pick a date</p>
          <div className="pb-4">
            {days.map((day) => (
              <ToggleButton
                key={day.id}
                value={day.id}
                selected={day === activeDay}
                onClick={() => setActiveDay(day)}
              >
                {day.name}
              </ToggleButton>
            ))}
            <CustomDatePicker
              selected={activeDay.value}
              onChange={handleAnotherDate}
            />
          </div>
          <p className="text-bold">Pick a timeslot</p>
          <p className="pb-3">
            Timezone <span className="timezone">PST</span>
          </p>
          <div className="pb-4">
            {timeslots.map((timeslot) => (
              <ToggleButton
                key={timeslot.value}
                classes="timeslot-button"
                disabled={timeslot.unavailable}
                selected={timeslot.value === activeTimeslot}
                onClick={() => setActiveTimeslot(timeslot.value)}
              >
                {timeslot.value}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>
      <footer className="d-flex flex-justify-end flex-items-center pr-4">
        <Link to="/schedule-request-form">
          <button className="btn btn-outline mr-2" type="button">
            <span>Next Step</span>
          </button>
        </Link>
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
    color: #1999df;
    font-weight: bold;
  }
`;
