import React from 'react';
import styled from 'styled-components';
import { Header } from '../header/index';

export const Layout = styled(({ className, headerOptions, children }) => {
  return (
    <div className={`${className} main-layout`}>
      <Header headerOptions={headerOptions} />
      <div className="box-panel-container">{children}</div>
    </div>
  );
})`
  height: 100%;
  .box-panel-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
