import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'layout/Loading';

const AppRTCVideoCall = lazy(() => import('video-call/AppRTC'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/videocall/apprtc/:roomName" component={AppRTCVideoCall} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
