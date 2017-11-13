import React from 'react';
import ReactDOM from 'react-dom';
import UserList from './components/UserList';
import UserRegistration from './components/UserRegistration';
import WeekGameList from './components/WeekGameList';
import { Router, Route, browserHistory } from 'react-router';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={UserList}/>
        <Route path="/user/register" component={UserRegistration}/>
        <Route path="/users" component={UserList}/>
        <Route path="/week/:year/:week/games" component={WeekGameList}/>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
