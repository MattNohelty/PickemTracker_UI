import axios from 'axios';

export {getUserPicksForYearWeek};

function getUserPicksForYearWeek(year, week) {
  const url = '/week/' + year + '/' + week + '/pick';
  return axios.get(url).then(response => response.data);
}
