import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HelloPage from './components/hello-page/hello-page';
import Time from './components/time/time';
import City from './components/city/city';
import Weather from './components/weather/weather';

ReactDOM.render(
  <Router>
    <Route path='/' component={HelloPage}
    exact />
    <Route path='/time' component={Time} />
    <Route path='/city' component={City} />
    <Route path='/weather' component={Weather} />
  </Router>,
  document.getElementById('root')
);
