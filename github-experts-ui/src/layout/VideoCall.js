import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'layout/Loading';

const apiRoot = process.env.REACT_APP_API_ROOT || '/api';

function sessionDone(roomName, durationInMinutes) {
  fetch(`${apiRoot}/Appointment/${roomName}`, {
    method: 'PATCH',
    headers: {
      // TODO: once auth is integrated into the frontend, add Authorization header here to pass-through B2C Bearer token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'completed',
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
  const [loading, setLoading] = useState(true);
  const { roomName } = useParams();

  useEffect(() => {
    let jitsi;
    let startTime;
    const reactRoot = document.getElementById('root');
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        width: '100%',
        height: '99.5%',
        parentNode: reactRoot,
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
    reactRoot.appendChild(script);
    return () => {
      if (jitsi) {
        jitsi.dispose();
      }
      reactRoot.removeChild(script);
    };
  }, [roomName, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return null;
}
