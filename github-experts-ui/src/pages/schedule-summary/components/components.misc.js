import React from 'react';
import { CSSCircle } from 'pages/scheduler/components/SideNavLayout';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

export const RepoCell = styled(({ className, color, repo }) => (
  <div className={`${className} repo-cell d-flex`}>
    <CSSCircle className="css-circle" color={color} />
    <div className="text">
      <p className="authorName">
        {repo[0]}
        <span>&nbsp;/&nbsp;</span>
      </p>
      <p className="repoName">{repo[1]}</p>
    </div>
  </div>
))`
  .authorName {
    color: rgb(171, 181, 192);
  }
  .repoName {
    color: rgb(89, 109, 130);
  }
  .css-circle {
    top: 12px;
    margin-right: 0.75rem;
  }
`;

export const AcceptanceButtons = styled(
  ({ className, updateAppt, ...rest }) => {
    const history = useHistory();
    const params = useParams();
    return (
      <div className={`${className} acceptance-buttons`}>
        <button
          className="btn btn-primary mr-2 bg-blue"
          onClick={() =>
            updateAppt('accepted', rest.row.original.id).then(() => {
              history.push(`/scheduler/${params.owner}/${params.repo}`);
            })
          }
        >
          Accept
        </button>
        <button
          class="btn btn-invisible text-gray"
          type="button"
          onClick={() =>
            updateAppt('rejected', rest.row.original.id).then((resp) => {
              history.push(`/scheduler/${params.owner}/${params.repo}`);
            })
          }
        >
          Reject
        </button>
      </div>
    );
  }
)``;
