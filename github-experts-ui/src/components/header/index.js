import React from 'react';
import styled from 'styled-components';
import GithubLogo from 'assets/github-logo.svg';
import ExpertsLogo from 'assets/Experts.svg';
import { StyledLink } from 'components/StyledLink';
import useProfile from 'utils/useProfile';

export const Header = styled(({ className, headerOptions, pathState }) => {
  const user = useProfile();

  return (
    <header className={`${className} d-flex Header`}>
      <div className="nav d-flex flex-items-center flex-1">
        <div className="title d-flex">
          <img src={GithubLogo} alt="" />
          <img className="experts-logo" src={ExpertsLogo} alt="" />
        </div>
        {headerOptions.map((item, i) => (
          <StyledLink
            key={i}
            to={{
              pathname: item.path,
              state: pathState,
            }}
          >
            <p className="nav-items Header-item">{item.text}</p>
          </StyledLink>
        ))}
      </div>
      {user && (
        <img
          className="avatar avatar-small mr-2"
          alt={user.login}
          src={user.avatar_url}
          width="40"
          height="40"
        />
      )}
    </header>
  );
})`
  background: #24292e;
  height: 64px;
  color: white;
  align-items: center;
  padding: 0 1rem;
  font-size: 24px;
  font-family: Source Sans Pro;

  .title {
    padding: 0 2rem;
  }
  .nav-items {
    font-family: SF Pro Text;
    font-size: 14px;
  }
  .experts-logo {
    position: relative;
    top: 2px;
    left: 2px;
  }
`;
