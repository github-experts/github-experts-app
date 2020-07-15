import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { sessionDone } from 'video-call/events';

function useUnload(callback) {
  const cb = useRef(callback);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [cb]);
}

export default function AppRTC() {
  const { roomName } = useParams();

  useUnload(() => sessionDone(roomName));

  return (
    <div>
      <iframe
        width="500"
        height="500"
        allow="camera;microphone;"
        title="AppRTC"
        src={`https://appr.tc/r/${roomName}`}
      />
    </div>
  );
}
