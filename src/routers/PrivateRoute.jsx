import { Route } from 'react-router-dom';

import Header from '../components/template/Header';
import Menu from '../components/template/Menu';
import Layout from '../components/template/Layout';
import Footer from '../components/template/Footer';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>
      <div className='wrapper'>
        <Header/>
        <Menu {...props}/>
        <Layout>
          <Component {...rest} />
        </Layout>
        <Footer/>
        <div id='sidebar-overlay'></div>
      </div>
    } />
  )
}

export default PrivateRoute;
