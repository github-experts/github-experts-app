import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { RequestFormStart } from './request-form-start/index';
import { RequestForm } from './request-form/index';
import { RequestFormSuccess } from './request-form-success';
import { useParams } from 'react-router-dom';

export const ScheduleRequestFormStart = () => {
  const { owner, repo } = useParams();

  return (
    <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
      <BoxPanel>
        <BreadCrumbs
          breadCrumbPaths={[owner, repo, 'Schedule a coaching session']}
        />
        <RequestFormStart owner={owner} repo={repo} />
      </BoxPanel>
    </Layout>
  );
};

export const ScheduleRequestForm = () => {
  const { owner, repo } = useParams();

  return (
    <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
      <BoxPanel>
        <BreadCrumbs breadCrumbPaths={[owner, repo, 'Requests']} />
        <RequestForm owner={owner} repo={repo} />
      </BoxPanel>
    </Layout>
  );
};

export const ScheduleRequestFormSuccess = () => {
  const { owner, repo } = useParams();

  return (
    <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
      <BoxPanel>
        <BreadCrumbs breadCrumbPaths={[owner, repo, 'Requests']} />
        <RequestFormSuccess owner={owner} repo={repo} />
      </BoxPanel>
    </Layout>
  );
};
