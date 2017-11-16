import React from 'react';
import ReactDOM from 'react-dom';
import UserList from './components/UserList';
import UserRegistration from './components/UserRegistration';
import WeekGameList from './components/WeekGameList';
import App from './components/App';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

const Root = () => {
  return ( 
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={UserList} />
        <Route path="/user/register" component={UserRegistration}/>
        <Route path="/users" component={UserList}/>
        <Route path="/week/:year/:week/games" component={WeekGameList}/>
      </Route>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
