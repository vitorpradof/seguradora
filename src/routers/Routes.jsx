import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Dashboard from '../pages/Dashboard';
import Apolices from '../pages/Apolices';
import Clientes from '../pages/Clientes';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Dashboard} title='Dashboard' />
      <PrivateRoute exact path='/dashboard' component={Dashboard} title='Dashboard' />
      <PrivateRoute exact path='/apolices' component={Apolices} title='Apolices' />
      <PrivateRoute exact path='/clientes' component={Clientes} title='Clientes' />
    </Switch>
  );
}