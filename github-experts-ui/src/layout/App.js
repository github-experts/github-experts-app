import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Loading from 'layout/Loading';
import { SchedulerPage } from 'pages/scheduler';
import { ScheduleSummary } from 'pages/schedule-summary';
import {
  ScheduleRequestFormStart,
  ScheduleRequestForm,
  ScheduleRequestFormSuccess,
} from 'pages/schedule-request-form';

const VideoCall = lazy(() => import('layout/VideoCall'));

// this is just to enable local development with B2C authentication
// in production this route isn't used as auth is handled by AppService EasyAuth
function DevLogin() {
  const prefix = '#id_token=';
  const idToken = window.location.hash.startsWith(prefix)
    ? window.location.hash.substring(prefix.length)
    : null;

  if (!idToken) {
    return (
      <a href="https://h3dev.b2clogin.com/h3dev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_github&client_id=144e9bd1-f04e-4454-abc6-1dae3af35cc4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000/devlogin&scope=openid&response_type=id_token&prompt=login">
        Click here for dev login
      </a>
    );
  } else {
    localStorage.setItem('id_token', idToken);
    return <Redirect to="/" />;
  }
}

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
          <Route exact path="/devlogin" component={DevLogin} />
        </Switch>
      </Suspense>
    </Router>
  );
}
