import React, { useEffect, useState } from 'react';
import { BoxPanel } from 'components/BoxPanel';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { Layout } from 'components/layout';
import { SideNavLayout } from './components/SideNavLayout/index';
import request from 'utils/request';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import { randomColor } from './components/Scheduler/CustomCell';

const getWeek = () => ({
  start: `${moment().startOf('week').format('YYYY-MM-DD')}`,
  end: `${moment().endOf('week').format('YYYY-MM-DD')}`,
});

export const SchedulerPage = () => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    request(
      // Need to get the repo name from somewhere else
      `schedule/github-experts+github-experts-sample-repo?startdate=${
        getWeek().start
      }&enddate=${getWeek().end}`,
      {
        method: 'GET',
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  }, []);

  const experts = {};
  const filteredUniqExperts = uniqBy(data, (item) => item.requestor);
  filteredUniqExperts.forEach((item) => {
    experts[item.requestor] = randomColor();
  });

  return (
    <Layout headerOptions={[{ text: 'Schedule', path: '/schedule' }]}>
      <BoxPanel>
        <BreadCrumbs breadCrumbPaths={['patniko', 'My Schedule']} />
        <SideNavLayout
          repoInfo={filteredUniqExperts.map((item) => ({
            authorName: item.requestor,
            repoName: item.partitionKey.split('+')[1],
            color: experts[item.requestor],
          }))}
          data={(data || []).map((item) => ({
            ...item,
            color: experts[item.requestor],
          }))}
        >
          test
        </SideNavLayout>
      </BoxPanel>
    </Layout>
  );
};
