import {
  AppointmentTooltip,
  Appointments,
  Resources,
  Scheduler,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';

import React from 'react';
import { RepoCell } from '../../../schedule-summary/components/components.misc';
import { ToggleButton } from '../../../../components/ToggleButton/index';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';
import styled from 'styled-components';

const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'private', text: 'Private', color: '#EC407A' },
      { id: 'work', text: 'Work', color: '#7E57C2' },
    ],
  },
];

const StyledRepoCell = styled(RepoCell).attrs({
  className: 'pt-4',
})`
  .text {
    display: flex;
  }
`;

const StyledPopUp = styled(({ className, appointmentData }) => {
  return (
    <div className={`${className} popup d-flex flex-column`}>
      <div className="table-info d-flex">
        <div className="user pr-3">
          <p className="title h5">User</p>
          <span className="IssueLabel IssueLabel--big mt-2 mb-2">Nilofer</span>
        </div>
        <div className="date pr-3 flex-1">
          <p className="title h5">Date</p>
          <span className="IssueLabel IssueLabel--big mt-2 mb-2">
            Thu 7/30 6:00AM
          </span>
        </div>
        <div className="cost">
          <p className="title h5">Cost</p>
          <span className="IssueLabel IssueLabel--big mt-2 mb-2">$50</span>
        </div>
      </div>
      <StyledRepoCell
        color="red"
        repo={['patniko', 'github-experts-sample-repo']}
      />
      <p className="description h5 pt-3">
        Id interdum sit urna, tincidunt donec velit, commodo. Lacus molestie
        nullam ultricies euismod semper et. Amet nulla quam gravida risus lorem
        posuere nec morbi sem. Ut semper risus urna amet.
      </p>
      <div className="button-group d-flex flex-justify-around flex-items-center flex-1">
        <ToggleButton>Cancel Session</ToggleButton>
        <ToggleButton className="btn-selected">Start Session</ToggleButton>
      </div>
    </div>
  );
})`
  padding: 1rem 1.5rem;
  height: 300px;
  .table-info {
    width: 100%;
  }
  .css-circle {
    top: 5px;
  }
  .IssueLabel {
    background-color: #dbedff;
    color: #0366d6;
  }
  .button-group {
    width: 100%;
    margin: auto;
    position: relative;
    top: 15px;
    button {
      width: 160px;
    }
  }
`;

const Appointment = ({ children, style, data, ...restProps }) => {
  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: data.color,
        borderLeftColor: 'rgb(243, 167, 71)',
        borderLeftStyle: 'solid',
        height: '47px',
        borderLeftWidth: '6px',
        color: 'white',
      }}
    >
      @{data.name}
    </Appointments.Appointment>
  );
};

export const MyScheduler = ({ data }) => {
  const [currentDate, setCurrentDate] = React.useState(
    moment().format('YYYY-MM-DD')
  );

  return (
    <Scheduler
      data={(data || []).map((item) => ({
        ...item,
        startDate: item.dateTime,
        endDate: item.endDateTime,
        name: item.requestor,
      }))}
    >
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={setCurrentDate}
        startDayHour={8}
      />
      <WeekView startDayHour={6} />
      <Appointments
        appointmentComponent={(props) => {
          return <Appointment {...props} />;
        }}
      />
      <AppointmentTooltip
        contentComponent={(props) => {
          return <StyledPopUp {...props} />;
        }}
      />
      <Resources data={resources} />
    </Scheduler>
  );
};
