import { NavLink } from 'react-router-dom';

import { MdDashboard, MdGroup, MdInsertDriveFile } from 'react-icons/md';

function Menu() {

  function fecharMenu() {
    let body = document.querySelector('body');

    if (body.classList.contains('sidebar-open')) {
      body.classList.add('sidebar-closed');
      body.classList.add('sidebar-collapse');
      body.classList.remove('sidebar-open');
    }
  };

  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      <div className='sidebar'>
        <nav className='mt-2'>
          <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
            <li className='nav-item'>
              <NavLink
                type='button'
                to='/dashboard'
                onClick={() => fecharMenu()}
                className='nav-link d-flex align-items-center'
              >
                <MdDashboard />
                <p style={{ marginLeft: 5 }}>Dashboard</p>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                type='button'
                to='/apolices'
                onClick={() => fecharMenu()}
                className='nav-link d-flex align-items-center'
              >
                <MdInsertDriveFile />
                <p style={{ marginLeft: 5 }}>Apolices</p>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                type='button'
                to='/clientes'
                onClick={() => fecharMenu()}
                className='nav-link d-flex align-items-center'
              >
                <MdGroup />
                <p style={{ marginLeft: 5 }}>Clientes</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;