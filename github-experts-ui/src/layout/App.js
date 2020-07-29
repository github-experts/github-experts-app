import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';
import { SchedulerPage } from 'pages/scheduler';
import { ScheduleSummary } from 'pages/schedule-summary';
import {
  ScheduleRequestFormStart,
  ScheduleRequestForm,
  ScheduleRequestFormSuccess,
} from 'pages/schedule-request-form';

const VideoCall = lazy(() => import('layout/VideoCall'));

export default function App() {
  return (
    <Router basename={process.env.REACT_APP_ROUTE_PREFIX}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/scheduler" component={SchedulerPage} />
          <Route exact path="/schedule-summary" component={ScheduleSummary} />
          <Route
            exact
            path="/schedule-request-form-start"
            component={ScheduleRequestFormStart}
          />
          <Route
            exact
            path="/schedule-request-form"
            component={ScheduleRequestForm}
          />
          <Route
            exact
            path="/schedule-request-form-success"
            component={ScheduleRequestFormSuccess}
          />
          <Route exact path="/videocall/:roomName" component={VideoCall} />
        </Switch>
      </Suspense>
    </Router>
  );
}
