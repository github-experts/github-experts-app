import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';
import { SchedulePage } from '../pages/schedule';
import PrivateRoute from 'components/PrivateRoute';
import { SchedulerPage } from 'pages/scheduler';
import { ScheduleSummary } from 'pages/schedule-summary';
import {
  ScheduleRequestForm,
  ScheduleRequestFormSuccess,
} from 'pages/schedule-request-form';

const VideoCall = lazy(() => import('layout/VideoCall'));
const Home = lazy(() => import('layout/Home'));
const IdToken = lazy(() => import('layout/IdToken'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/schedule" component={SchedulePage} />
          <Route exact path="/scheduler" component={SchedulerPage} />
          <Route exact path="/schedule-summary" component={ScheduleSummary} />
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
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/videocall/:roomName" component={VideoCall} />
          <Route exact path="/id_token=:idToken" component={IdToken} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
