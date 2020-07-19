import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';

const AppRTCVideoCall = lazy(() => import('video-call/AppRTC'));
const JitsiVideoCall = lazy(() => import('video-call/Jitsi'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/videocall/apprtc/:roomName" component={AppRTCVideoCall} />
          <Route exact path="/videocall/jitsi/:roomName" component={JitsiVideoCall} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
