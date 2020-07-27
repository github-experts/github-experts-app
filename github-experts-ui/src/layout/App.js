import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';
import { SchedulePage } from '../pages/schedule';

const VideoCall = lazy(() => import('layout/VideoCall'));
const Home = lazy(() => import('layout/Home'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/schedule" component={SchedulePage} />
          <Route exact path="/videocall/:roomName" component={VideoCall} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
