import { useEffect, useState } from 'react';
import request from 'utils/request';

export default function useProfile() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const authMeResponse = await request('/.auth/me');
      const authMe = await authMeResponse.json();

      const githubToken = authMe
        ?.find(({ provider_name }) => provider_name === 'aad')
        ?.user_claims?.find(({ typ }) => typ === 'idp_access_token')?.val;

      if (githubToken == null) {
        return;
      }

      const githubMeResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const githubMe = await githubMeResponse.json();

      setUser(githubMe);
    })();
  }, [setUser]);

  return user;
}
