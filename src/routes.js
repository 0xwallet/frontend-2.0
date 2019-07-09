import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Login = React.lazy(() => import('./views/Login'));

const requireAuth = (nextState, replace) => {
  console.log('just test')
  if (true) {
      replace({ pathname: '/' }) // 路由转发
  }else{
      // ...
  }
}


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {path : '/login', name : "Login", component : Login,onEnter : {requireAuth}}
];

export default routes;
