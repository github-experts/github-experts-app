import React from 'react';
import styled from 'styled-components';
import GithubLogo from '../../assets/github-logo.svg';
import { StyledLink } from 'components/StyledLink';

export const Header = styled(({ className, headerOptions, children }) => {
  return (
    <header className={`${className} d-flex Header`}>
      <p className="title d-flex">
        <img src={GithubLogo} alt="" />
        <p className="header-items">Tutors</p>
      </p>
      {headerOptions.map((item) => (
        <StyledLink to={item.path}>
          <p className="nav-items Header-item">{item.text}</p>
        </StyledLink>
      ))}
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
    margin-right: 2rem;
  }
  .nav-items {
    font-family: SF Pro Text;
    font-size: 14px;
  }
`;
