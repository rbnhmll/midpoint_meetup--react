import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
  Route, Link } from 'react-router-dom';
import App from './app';
import Login from './components/login';

const Root = () => {
  return (
    <Router>
      <div>
        <Link to="/login">Login</Link>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('app'));
