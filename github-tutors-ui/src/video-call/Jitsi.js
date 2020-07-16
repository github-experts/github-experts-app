import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'layout/Loading';
import { sessionDone } from 'video-call/events';

export default function Jitsi() {
  const jitsiNode = useRef();
  const [loading, setLoading] = useState(true);
  const { roomName } = useParams();

  useEffect(() => {
    let jitsi;
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        width: 500,
        height: 500,
        parentNode: jitsiNode.current,
      });
      jitsi.getIFrame().onload = () => setLoading(false);
      jitsi.addEventListener('readyToClose', () => sessionDone(roomName));
    };
    document.body.appendChild(script);
    return () => {
      if (jitsi) {
        jitsi.dispose();
      }
      document.body.removeChild(script);
    };
  }, [roomName, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div ref={jitsiNode} />
    </div>
  );
}
