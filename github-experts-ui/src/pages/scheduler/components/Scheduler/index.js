import {
  Appointments,
  Resources,
  Scheduler,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';
import { CustomCellComponent } from './CustomCell';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';

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
          return <CustomCellComponent {...props} />;
        }}
      />
      <Resources data={resources} />
    </Scheduler>
  );
};
