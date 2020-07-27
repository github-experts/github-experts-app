import React from 'react';
import styled from 'styled-components';

export const BoxPanel = styled(({ className, children }) => {
  return <div className={`${className} box-panel`}>{children}</div>;
})`
  height: 80%;
  width: 80%;
  border: 1px solid red;
`;
