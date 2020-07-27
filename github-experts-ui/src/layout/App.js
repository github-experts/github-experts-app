import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';

const VideoCall = lazy(() => import('video-call/Jitsi'));
const Home = lazy(() => import('layout/Home'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/videocall/:roomName" component={VideoCall} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
