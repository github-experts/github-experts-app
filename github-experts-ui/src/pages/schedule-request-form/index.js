import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { RequestForm } from './request-form/index';
import { RequestFormSuccess } from './request-form-success';

export const ScheduleRequestForm = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'experts-demo', 'Requests']} />
      <RequestForm />
    </BoxPanel>
  </Layout>
);

export const ScheduleRequestFormSuccess = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'experts-demo', 'Requests']} />
      <RequestFormSuccess />
    </BoxPanel>
  </Layout>
);
