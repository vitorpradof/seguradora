import { NavLink } from 'react-router-dom';

import { MdDashboard, MdGroup } from 'react-icons/md';

function Menu() {
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      <div className='sidebar'>
        <nav className='mt-2'>
          <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
            <li style={{ marginBottom: '10px' }} className='nav-item'>
              <NavLink
                type='button'
                to='/dashboard'
                className='nav-link d-flex align-items-center'
              >
                <MdDashboard />
                <p style={{ marginLeft: 5 }}>Dashboard</p>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                type='button'
                to='/clientes'
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