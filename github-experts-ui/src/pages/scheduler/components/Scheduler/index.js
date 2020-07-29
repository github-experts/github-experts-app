import React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import styled from 'styled-components';

const appointments = [
  {
    startDate: '2018-10-31T10:00',
    endDate: '2018-10-31T11:15',
    title: 'Meeting',
    type: 'private',
  },
  {
    startDate: '2018-10-31T07:30',
    endDate: '2018-10-31T09:00',
    title: 'Go to a gym',
    type: 'work',
  },
];
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

const CustomComponent = styled(({ className }) => {
  return <div className={`${className} custom-component`}>@Leo</div>;
})`
  & {
    background: rgb(255, 247, 237);
    border-left-color: rgb(243, 167, 71);
    border-left-style: solid;
    height: 47px;
    border-left-width: 6px;
  }
`;

export const MyScheduler = () => {
  const [currentDate, setCurrentDate] = React.useState('2018-10-31');

  return (
    <Scheduler data={appointments}>
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={setCurrentDate}
      />
      <WeekView />
      <Appointments
        appointmentComponent={(props) => {
          return <CustomComponent {...props} />;
        }}
      />
      <Resources data={resources} />
    </Scheduler>
  );
};
