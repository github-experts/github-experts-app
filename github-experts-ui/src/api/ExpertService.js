import request from 'utils/request';
import moment from 'moment';

export const GetExperts = (repo) => {
  const generateLabels = (expert) => {
    let labels = [];
    labels.push('$' + expert.rate);
    labels.push('30-min session');
    if (expert.openToDonate) {
      labels.push('Open to donate time');
    }

    return labels;
  };

  return request(`experts/${repo}`, {})
    .then((response) => response.json())
    .then((data) => {
      return data.map((d) => {
        return {
          id: d.rowKey,
          name: d.handle,
          labels: generateLabels(d),
          rate: d.rate,
        };
      });
    });
};

export const GetMonthlyAvailability = (repo, expertHandle, timezone) => {
  // TODO: what time zones are valid?  Does this have to be 'America/Los_Angeles'?
  timezone = timezone ?? 'PST';

  return request(
    `monthlyavailability/${repo}/${expertHandle}?tz=${timezone}`,
    {}
  )
    .then((response) => response.json())
    .then((data) => {
      return data.map((d) => {
        return {
          date: d.startDate,
          available: d.available,
        };
      });
    });
};

export const GetDailyAvailability = (repo, expertHandle, date, timezone) => {
  let tzEncoded = encodeURIComponent(timezone ?? 'America/Los_Angeles');
  let startDate = moment(date).format('YYYY-MM-DD');
  let endDate = moment(date).add(1, 'day').format('YYYY-MM-DD');

  return request(
    `dailyavailability/${repo}/${expertHandle}?startDate=${startDate}&endDate=${endDate}&tz=${tzEncoded}`,
    {}
  )
    .then((response) => response.json())
    .then((data) => {
      return data
        .filter((d) => {
          return moment(d.startDate).isSame(moment(startDate), 'day');
        })
        .map((d) => {
          return {
            value: moment(d.startDate).format('hh:mm A'),
            unavailable: !d.available,
          };
        });
    });
};
