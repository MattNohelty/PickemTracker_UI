import axios from 'axios';

export {getUserPicksForYearWeek};
export {saveUserPicksForYearWeek};

function getUserPicksForYearWeek(year, week) {
  const url = '/week/' + year + '/' + week + '/pick';
  return axios.get(url).then(response => response.data);
}

function saveUserPicksForYearWeek(year, week, picks) {
  const url = '/week/' + year + '/' + week + '/pick';
  return axios.post(url, picks).then(response => response.data);
}
