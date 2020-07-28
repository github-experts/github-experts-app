import React from 'react';
import styled from 'styled-components';
import { RequestFormStyles } from '../index.style';

export const ColumnInfo = styled(({ className, label, text }) => {
  return (
    <div className={className}>
      <div className="container">
        <p>{label}</p>
        <p>
          <span className="IssueLabel IssueLabel--big bg-blue text-white mr-1">
            {text}
          </span>
        </p>
      </div>
    </div>
  );
})`
  .container {
    line-height: 2rem;
  }
`;

export const RequestForm = styled(({ className }) => {
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
            <button className="btn" type="button">
              Change
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-header">
            <label htmlFor="example-textarea">
              Tell us what you want to learn
            </label>
          </div>
          <div className="form-group-body">
            <textarea className="form-control" id="textarea"></textarea>
            <div className="radio-checkboxes d-flex flex-column pt-2">
              <label className="d-flex flex-items-center">
                <input type="radio" />
                <span>I will pay $50 for this 30-minute session</span>
              </label>
              <label className="d-flex  flex-items-center">
                <input type="radio" />
                <span>I hope to request a free session</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <footer className="d-flex flex-justify-end flex-items-center pr-4">
        <button className="btn btn-outline mr-2" type="button">
          <span>Request now</span>
        </button>
      </footer>
    </div>
  );
})`
  ${RequestFormStyles};
`;
