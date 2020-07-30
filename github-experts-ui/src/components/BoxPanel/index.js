import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

export const BoxPanel = styled(({ className, children }) => {
  return <div className={`${className} box-panel`}>{children}</div>;
})`
  overflow: auto;
  box-shadow: 0px 4px 12px rgba(27, 31, 35, 0.15);
  height: 80%;
  max-height: 600px;
  width: 80%;
  margin-bottom: 9rem;

  ${media.lessThan('medium')`
    height: 100%;
    width: 100%;
  `}
`;
