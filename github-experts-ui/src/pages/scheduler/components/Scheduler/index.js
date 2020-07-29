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
    name: 'Adam',
  },
  {
    startDate: '2018-10-31T07:30',
    endDate: '2018-10-31T09:00',
    title: 'Go to a gym',
    type: 'work',
    name: 'Karen',
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

const CustomComponent = styled(({ className, data }) => {
  return (
    <div className={`${className} custom-component`}>
      {`@${data.name}`}
      <div className="Popover position-relative">
        <div className="Popover-message Popover-message--top-left p-4 mt-2 Box box-shadow-large">
          <h4 className="mb-2">Popover heading</h4>
          <p>Message about this particular piece of UI.</p>
          <button type="submit" className="btn btn-outline mt-2 text-bold">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
})`
  & {
    background: rgb(255, 247, 237);
    border-left-color: rgb(243, 167, 71);
    border-left-style: solid;
    height: 47px;
    border-left-width: 6px;
  }
  .tooltipped {
    height: 400px;
  }
`;

export const MyScheduler = () => {
  const [currentDate, setCurrentDate] = React.useState('2018-10-31');

  return (
    <Scheduler data={appointments}>
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={setCurrentDate}
        startDayHour={8}
      />
      <WeekView startDayHour={6} />
      <Appointments
        appointmentComponent={(props) => {
          console.log('props: ', props);
          return <CustomComponent {...props} />;
        }}
      />
      <Resources data={resources} />
    </Scheduler>
  );
};
