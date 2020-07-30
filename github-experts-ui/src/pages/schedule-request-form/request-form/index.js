import { Link, withRouter } from 'react-router-dom';
import React, { useState, useCallback, useRef } from 'react';
import { ColumnInfo } from './components.misc';
import { RequestFormStyles } from '../index.style';
import moment from 'moment';
import styled from 'styled-components';
import request from 'utils/request';
import get from 'lodash/get';

export const concatThirtyMins = (date) =>
  `${moment(date).format('hh:mm A')} - ${moment(date)
    .add(30, 'minutes')
    .format('h:mm A')}`;

export const formatDateTime = (date) =>
  moment(date).format('dddd, MMM DD, YYYY');

export const RequestForm = styled(
  withRouter(({ className, history, location }) => {
    const [selectedRadioIndex, setselectedRadioIndex] = useState(0);
    const [, setError] = useState(undefined);
    const textAreaRef = useRef(null);
    const paymentOptions = [
      `I will pay $${location.state.Rate} for this 30-minute session`,
    ];
    if (get(location, 'state.RequestFree', false)) {
      paymentOptions.push('I hope to request a free session');
    }

    const createAppt = useCallback((payload) => {
      return request('/api/appointment', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(() => {})
        .catch((error) => {
          setError(error);
        });
    }, []);

    return (
      <div className={`${className} request-form d-flex flex-column`}>
        <div className="top-section flex-1">
          <div className="flash pills d-flex">
            <div className="column-info d-flex">
              {[
                { label: 'Tutor', text: location.state.Expert },
                {
                  label: 'Date',
                  text: formatDateTime(
                    get(location, 'state.DateTime', 'Thursday, Jul 30, 2020')
                  ),
                },
                {
                  label: 'Time',
                  text:
                    (get(location, 'state.DateTime') &&
                      concatThirtyMins(location.state.DateTime)) ||
                    '1:30PM - 2:00 PM (PST)',
                },
                {
                  label: 'Cost',
                  text: `$${get(location, 'state.Rate', '50')}`,
                },
              ].map((item, i) => (
                <ColumnInfo key={i} label={item.label} text={item.text} />
              ))}
            </div>
            <div className="cta-button">
              <Link to="/schedule-request-form-start">
                <button className="btn" type="button">
                  Change
                </button>
              </Link>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-header">
              <label htmlFor="example-textarea">
                Tell us what you want to learn
              </label>
            </div>
            <div className="form-group-body">
              <textarea
                ref={textAreaRef}
                className="form-control"
                id="textarea"
              ></textarea>
              <div className="radio-checkboxes d-flex flex-column pt-2">
                {paymentOptions.map((item, i) => (
                  <label className="d-flex flex-items-center">
                    <input
                      type="radio"
                      onClick={() => setselectedRadioIndex(i)}
                      {...((selectedRadioIndex === i && { checked: true }) || {
                        checked: false,
                      })}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="d-flex flex-justify-end flex-items-center pr-4">
          <button
            className="btn btn-outline mr-2"
            type="button"
            onClick={() => {
              const payload = {
                DateTime: get(location, 'state.DateTime'),
                Requestor: location.state.Requestor,
                Status: 'requested',
                Details: textAreaRef.current.value,
                Rate: get(location, 'state.Rate'),
                RequestFree: selectedRadioIndex === 1 ? true : false,
                Expert: location.state.Expert,
                // Need to get this from somewhere else.
                Repo: 'github-experts+github-experts-sample-repo',
              };

              createAppt(payload).then(() => {
                history.push('/schedule-request-form-success', payload);
              });
            }}
          >
            <span>Request now</span>
          </button>
        </footer>
      </div>
    );
  })
)`
  ${RequestFormStyles};
`;
