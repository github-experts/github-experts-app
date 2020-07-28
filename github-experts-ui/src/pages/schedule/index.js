import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { SessionPicker } from 'pages/schedule/components/SessionPicker';
import { BreadCrumbs } from 'components/Breadcrumbs';

export const SchedulePage = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'experts-demo', 'Schedule a coaching session']} />
      <SessionPicker></SessionPicker>
    </BoxPanel>
  </Layout>
);
