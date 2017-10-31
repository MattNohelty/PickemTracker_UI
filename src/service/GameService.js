import axios from 'axios';

export {getAllGamesForYearWeek};

function getAllGamesForYearWeek(year, week) {
  const url = '/week/' + year + '/' + week + '/game';
  return axios.get(url).then(response => response.data);
}
