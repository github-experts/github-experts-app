import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { RequestFormStart } from './request-form-start/index';
import { RequestForm } from './request-form/index';
import { RequestFormSuccess } from './request-form-success';

export const ScheduleRequestFormStart = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
    <BoxPanel>
      <BreadCrumbs
        breadCrumbPaths={[
          'patniko',
          'experts-demo',
          'Schedule a coaching session',
        ]}
      />
      <RequestFormStart></RequestFormStart>
    </BoxPanel>
  </Layout>
);

export const ScheduleRequestForm = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'experts-demo', 'Requests']} />
      <RequestForm />
    </BoxPanel>
  </Layout>
);

export const ScheduleRequestFormSuccess = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/scheduler' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'experts-demo', 'Requests']} />
      <RequestFormSuccess />
    </BoxPanel>
  </Layout>
);
