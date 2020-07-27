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
        width: '100%',
        height: '99.5%',
        parentNode: jitsiNode.current,
      });
      jitsi.getIFrame().onload = () => setLoading(false);
      jitsi.addEventListener('readyToClose', () => {
        sessionDone(roomName);
        window.location = document.referrer || window.location.origin;
      });
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

  return <div ref={jitsiNode} />;
}
