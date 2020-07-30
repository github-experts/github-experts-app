import React from 'react';
import styled from 'styled-components';

export const ColumnInfo = styled(({ className, label, text }) => {
  return (
    <div className={className}>
      <div className="container">
        <p>{label}</p>
        <p>
          <span className="IssueLabel IssueLabel--big mr-1">{text}</span>
        </p>
      </div>
    </div>
  );
})`
  .container {
    line-height: 2rem;
  }
  .IssueLabel {
    background-color: #dbedff;
    color: #0366d6;
  }
`;
