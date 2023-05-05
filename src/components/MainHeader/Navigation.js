import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../Store/UserContex';

const Navigation = (props) => {
 const data=useContext(AuthContext)
  console.log(data)
  return (
    <nav className={classes.nav}>
      <ul>
        {data.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {data.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {data.isLoggedIn && (
          <li>
            <button onClick={data.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
