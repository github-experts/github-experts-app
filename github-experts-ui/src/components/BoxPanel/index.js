import React from 'react';
import styled from 'styled-components';

export const BoxPanel = styled(({ className, children }) => {
  return <div className={`${className} box-panel`}>{children}</div>;
})`
  box-shadow: 0px 4px 12px rgba(27, 31, 35, 0.15);
  height: 80%;
  width: 80%;
`;
