import React from 'react';
import { useSelector } from 'react-redux';
import Loading from 'layout/Loading';
import * as userStore from 'stores/userStore';

export default function Home() {
  const user = useSelector(userStore.get);

  if (!user?.name) {
    return <Loading />;
  }

  return (
    <>
      <div>Hello {user.name}</div>
      <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
    </>
  );
}
