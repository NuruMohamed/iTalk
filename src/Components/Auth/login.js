import React, {useContext, useRef} from 'react';
import './loginStyle.css';
import { CurrentUser} from './../UserContext.js';
import {auth} from './firebaseAuth.js';

function Login(props) {
    let {user} = useContext(CurrentUser);
    let [currentUser, setCurrentUser] = user;
    let email = useRef();
    let password = useRef();
    let loginError = useRef();

    let handleLogin = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email.current.value, password.current.value)
        .then(cred => {
            setCurrentUser(cred.user.uid);
            console.log(cred.user.email);
        })
        .catch(error => loginError.current.innerHTML = 'INCORRECT');
    }

    return (
        <div id='loginContainer'>
            <h2 id='loginTitle'>Login</h2>
            <form id='loginForm'>
                <table>
                    <tbody>
                        <tr>
                            <td> Email </td>
                            <td> <input ref={email} type='email' />  </td>
                        </tr>
                        <tr>
                            <td> Password </td>
                            <td> <input ref={password} type='password' /> </td>
                        </tr>
                        <tr cols='2'>
                            <td> <button onClick={ event => handleLogin(event) } > LogIn </button>  <span id='signUpLink' onClick={ () => props.setAuthState('signup') } >Sign up</span> </td>
                        </tr>
                        <tr >
                            <td colSpan='2' ref={loginError} className='loginError'>  </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Login;