import React from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { Layout } from 'components/layout';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { SideNavLayout } from './components/SideNavLayout/index';

export const SchedulerPage = () => (
  <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
    <BoxPanel>
      <BreadCrumbs breadCrumbPaths={['Business', 'Customers', 'MailChimp']} />
      <SideNavLayout
        repoInfo={[
          {
            authorName: 'patniko',
            repoName: 'expert-demo',
          },
          {
            authorName: 'JaidedAI',
            repoName: 'patnikorn',
          },
        ]}
      >
        test
      </SideNavLayout>
    </BoxPanel>
  </Layout>
);
