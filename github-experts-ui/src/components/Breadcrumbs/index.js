import React from 'react';
import styled from 'styled-components';

const NoOpLink = styled.a`
  pointer-events: none;
`;

export const BreadCrumbs = styled(({ className, breadCrumbPaths }) => {
  return (
    <nav
      className={`${className} breadcrumbs d-flex flex-items-center p-3`}
      aria-label="Breadcrumb"
    >
      <ol>
        {breadCrumbPaths.slice(0, -1).map((item, i) => {
          return (
            <li key={i} className="breadcrumb-item text-medium">
              <NoOpLink>{item}</NoOpLink>
            </li>
          );
        })}
        <li
          className="breadcrumb-item breadcrumb-item-selected text-medium text-gray"
          aria-current="page"
        >
          {breadCrumbPaths.slice(-1)[0]}
        </li>
      </ol>
    </nav>
  );
})`
  height: 52px;
  background: #f6f8fa;
  border: 1px solid #d1d5da;
  border-radius: 6px 6px 0px 0px;
`;
