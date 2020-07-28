import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userStore from 'stores/userStore';

function LoginRedirect(props) {
  const user = useSelector(userStore.get);

  if (!user || !user.idToken) {
    const tenantName = process.env.REACT_APP_B2C_TENANT_NAME;
    const clientId = process.env.REACT_APP_B2C_CLIENT_ID;
    const redirectUri = window.location.origin;

    window.location.href =
      `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/oauth2/v2.0/authorize` +
      '?p=B2C_1_github' +
      `&client_id=${clientId}` +
      '&nonce=defaultNonce' +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      '&scope=openid+profile+email' +
      '&response_type=id_token' +
      '&prompt=login';

    return null;
  }

  return props.children;
}

function LoginProfile() {
  const dispatch = useDispatch();
  const user = useSelector(userStore.get);

  useEffect(() => {
    (async () => {
      if (!user?.idToken || user.name) {
        return;
      }

      let response;

      try {
        response = await fetch(`${process.env.REACT_APP_API_ROOT}/me`, {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
            Accept: 'application/json',
          },
        });
      } catch (error) {
        console.error(error);
        dispatch(userStore.logout());
        return;
      }

      const profile = await response.json();
      dispatch(userStore.login({ ...user, ...profile }));
    })();
  }, [user, dispatch]);

  return null;
}

function Login() {
  return (
    <LoginRedirect>
      <LoginProfile />
    </LoginRedirect>
  );
}

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(userStore.get);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.name != null ? <Component {...props} /> : <Login />
      }
    />
  );
}
