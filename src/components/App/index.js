import React  from 'react';
import {browserHistory, hashHistory, Router, Route, IndexRoute} from 'react-router';
import Container from '../Container';
import NotFound from '../NotFound';
import Home from '../Home';

class App extends React.Component {
  render() {
    return (
       <Router history={browserHistory}>
          <Route path="/" component={Container}>
            <IndexRoute component={Home} />
            <Route path="*" component={NotFound} />
          </Route>
      </Router>
    );
  }
}

export default App;