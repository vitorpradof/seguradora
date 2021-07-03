import { Route } from 'react-router-dom';

import Header from '../components/template/Header';
import Menu from '../components/template/Menu';
import Layout from '../components/template/Layout';
import Footer from '../components/template/Footer';

function PrivateRoute({ component: Component, ...rest }) {

  function fecharMenu() {
    let body = document.querySelector('body');

    if (body.classList.contains('sidebar-open')) {
      body.classList.add('sidebar-closed');
      body.classList.add('sidebar-collapse');
      body.classList.remove('sidebar-open');
    }
  };

  return (
    <Route {...rest} render={(props) =>
      <div className='wrapper'>
        <Header/>
        <Menu {...props}/>
        <Layout>
          <Component {...rest} />
        </Layout>
        <Footer/>
        <div id='sidebar-overlay' onClick={() => fecharMenu()}></div>
      </div>
    } />
  )
}

export default PrivateRoute;
