// react hot loader
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Mainboard from '../boards/Mainboard';
import Inboxboard from '../boards/Inboxboard';
import history from '../history';
import '../../sass/main.scss';

const App = () => {
  return (
    <div className="app_container">
      <BrowserRouter history={history}>
        <div>
          <Header />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Mainboard} />
            <Route path="/inbox" component={Inboxboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default hot(App);
