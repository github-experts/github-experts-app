import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BoxPanel } from 'components/BoxPanel';
import { BreadCrumbs } from 'components/Breadcrumbs';
import { Layout } from 'components/layout';
import { SideNavLayout } from './components/SideNavLayout/index';
import moment from 'moment';
import { randomColor } from './components/Scheduler/CustomCell';
import request from 'utils/request';
import uniqBy from 'lodash/uniqBy';
import { useParams } from 'react-router-dom';
import { storeSchedule } from 'stores/schedulerStore';

export const getWeek = () => ({
  start: `${moment().startOf('week').format('YYYY-MM-DD')}`,
  end: `${moment().endOf('week').format('YYYY-MM-DD')}`,
});

export const SchedulerPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState(undefined);
  useEffect(() => {
    request(
      // Need to get the repo name from somewhere else
      `/api/appointments/${params.expertName}?startdate=${
        getWeek().start
      }&enddate=${getWeek().end}`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
        dispatch(storeSchedule(resp));
      });
  }, [params.expertName, dispatch]);

  const experts = {};
  const filteredUniqExperts = uniqBy(data, (item) => item.expert);
  filteredUniqExperts.forEach((item) => {
    experts[item.expert] = randomColor();
  });

  return (
    <Layout
      headerOptions={[
        { text: 'Schedule', path: '/schedule' },
        { text: 'Requests', path: '/schedule-summary' },
      ]}
    >
      <BoxPanel>
        <BreadCrumbs breadCrumbPaths={['patniko', 'My Schedule']} />
        <SideNavLayout
          repoInfo={filteredUniqExperts.map((item) => ({
            authorName: item.expert,
            repoName: item.partitionKey.split('+')[1],
            color: experts[item.expert],
          }))}
          data={(data || []).map((item) => ({
            ...item,
            color: experts[item.expert],
          }))}
        >
          test
        </SideNavLayout>
      </BoxPanel>
    </Layout>
  );
};
