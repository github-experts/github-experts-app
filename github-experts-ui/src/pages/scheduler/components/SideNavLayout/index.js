import React from 'react';
import styled from 'styled-components';
import { MyScheduler } from '../Scheduler';

export const CSSCircle = styled.p`
  height: 12px;
  width: 12px;
  background-color: ${(props) => {
    return props.color;
  }};
  border-radius: 50%;
  position: relative;
  top: 1px;
`;

export const SideNavLayout = styled(({ className, data, repoInfo }) => {
  return (
    <div className={`${className} scheduler-side-nav d-flex`}>
      <div className="side-nav p-3">
        <p className="title f6 text-bold mb-4">All repo</p>
        <div className="repo-names">
          {repoInfo.map((item, i) => (
            <div key={i} className="repo-item d-flex flex-items-center pb-2">
              <CSSCircle color={item.color} className="mr-3" />
              <p className="author-name">{item.authorName}</p>
              <span>&nbsp;/&nbsp;</span>
              <p className="repo-name">{item.repoName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-pane flex-1">
        <MyScheduler data={data} />
      </div>
    </div>
  );
})`
  height: calc(100% - 52px);
  overflow: hidden;

  .side-nav {
    width: 335px;
    border-right: 0.5px solid #c0c0c0;
  }
  .title {
    font-size: 19px;
  }
  .repo-item {
    .author-name {
      color: rgb(171, 181, 192);
    }
    .repo-name {
      color: rgb(89, 109, 130);
    }
  }
`;
