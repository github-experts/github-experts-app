import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as userStore from 'stores/userStore';

export default function IdToken() {
  const dispatch = useDispatch();
  const { idToken } = useParams();

  dispatch(userStore.login({ idToken }));

  return <Redirect to="/schedule-request-form-start" />;
}
