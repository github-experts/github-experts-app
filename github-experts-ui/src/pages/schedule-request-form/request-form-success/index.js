import React from 'react';
import styled from 'styled-components';
import { ColumnInfo } from '../request-form';
import SuccessImg from 'assets/Success.svg';
import { RequestFormStyles } from '../index.style';

export const RequestFormSuccess = styled(({ className }) => {
  return (
    <div className={`${className} request-form d-flex flex-column`}>
      <div className="top-section flex-1">
        <div className="flash pills d-flex">
          <div className="column-info d-flex">
            {[
              { label: 'Tutor', text: 'patniko' },
              { label: 'Date', text: 'Thursday, Jul 30, 2020' },
              { label: 'Time', text: '1:30PM - 2:00 PM (PST)' },
              { label: 'Cost', text: '$50' },
            ].map((item, i) => (
              <ColumnInfo key={i} label={item.label} text={item.text} />
            ))}
          </div>
          <div className="cta-button">
            <img src={SuccessImg} width="60px" alt="" />
          </div>
        </div>
        <div className="text-section h5 flex-column">
          <p>
            Your request has been submitted! Please watch your email for the
            appointment detail.
          </p>
          <button className="btn-link pt-3" type="button">
            Add to Calendar
          </button>
        </div>
      </div>
      <footer className="d-flex flex-justify-center flex-items-center pr-4">
        Go back to Github in 5 seconds.
      </footer>
    </div>
  );
})`
  ${RequestFormStyles};
  .text-section {
    height: 80%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      width: 190px;
      font-weight: bold;
    }
  }
`;
