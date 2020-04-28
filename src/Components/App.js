import React,{Fragment, useContext} from 'react';
import './AppStyle.css';
import { UserContext} from './UserContext';
import Auth from './Auth/Auth.js';
function App() {

  return (
      <Fragment>
            <UserContext>
                <Auth/>
            </UserContext>
        </Fragment>
  );
}

export default App;
