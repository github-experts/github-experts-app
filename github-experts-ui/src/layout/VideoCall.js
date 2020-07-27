import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'layout/Loading';

function sessionDone(roomName, durationInMinutes) {
  fetch(`${process.env.REACT_APP_API_ROOT}/calldone/${roomName}`, {
    method: 'PATCH',
    headers: {
      // TODO: once auth is integrated into the frontend, add Authorization header here to pass-through B2C Bearer token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      durationInMinutes,
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      }
      console.log(`Notified server of session ${roomName} end`);
    })
    .catch((error) =>
      console.log(
        `Error notifying server of session end for room ${roomName}`,
        error
      )
    );
}

export default function Jitsi() {
  const jitsiNode = useRef();
  const [loading, setLoading] = useState(true);
  const { roomName } = useParams();

  useEffect(() => {
    let jitsi;
    let startTime;
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
      jitsi.getIFrame().onload = () => {
        setLoading(false);
        startTime = new Date();
      };
      jitsi.addEventListener('readyToClose', () => {
        sessionDone(roomName, (new Date() - startTime) / 60000);
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
