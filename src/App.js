import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';
// import { renderRoutes } from 'react-router-config';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});



const requireAuth = (nextState, replace) => {
  console.log('just test')
  if (true) {
      replace({ pathname: '/' }) // 路由转发
  }else{
      // ...
  }
}

class App extends Component {
  render() {
    return (   
      <Router>
        <Switch>
          <Route path="/login" name="Login" component={Login} onEnter={requireAuth}/>
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
        </Router>
    );
  }
}

export default App;
