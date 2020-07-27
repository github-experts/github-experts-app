export function sessionDone(roomName) {
  fetch(`${process.env.REACT_APP_API_ROOT}/calldone`, {
    method: 'POST',
    headers: {
      // TODO: once auth is integrated into the frontend, add Authorization header here to pass-through B2C Bearer token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomName,
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
