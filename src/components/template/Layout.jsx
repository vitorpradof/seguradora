import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Dashboard(props) {
  return (
    <div id='mainDiv' className='content-wrapper'>
      <ToastContainer position="top-right" autoClose={5000} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange={true} draggable={false} />
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-12'>
              <h1 className='m-0 text-dark'>{props.children.props.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className='content'>
        <div className='container-fluid'>
          { props.children }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;