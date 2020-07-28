import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { SummaryTable } from './components/summary-table';

export const ScheduleSummary = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['patniko', 'Requests']} />
      <SummaryTable />
    </BoxPanel>
  </Layout>
);
