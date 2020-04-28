import React, { useRef, useContext } from 'react';
import './../../Style/Desktop/Auth/signup.css';
import { firebase } from './firebaseAuth.js';
import { CurrentUser} from './../UserContext.js';
import {auth,  db} from './firebaseAuth.js';

function Signup(props) {
    let {user} = useContext(CurrentUser);
    let [currentUser, setCurrentUser] = user;

    let firstName = useRef();
    let lastName = useRef();
    let city = useRef();
    let country = useRef();
    let description = useRef();
    let email = useRef();
    let password = useRef();
    let signupError = useRef();

    let handleSignup = event => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
        .then(cred => {
           db.collection('users').doc(cred.user.uid).set({
                firstName: capitalize(firstName.current.value),
                lastName: capitalize(lastName.current.value),
                city: capitalize(city.current.value),
                country: capitalize(country.current.value),
                description: description.current.value,
                userId: firstName.current.value + Math.floor(Math.random() * 999),
                followers: [],
                following: [],
                pictureURL: 'http://calculator.codenuru.com/images/user.png'
            })
            .then(() => {
                    props.setAuthState('login')
                }
            )
            .catch(error => {
                signupError.current.innerHTML = error.message;
            })
        })
        .catch(error => signupError.current.innerHTML = error.message);
    }

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

    return (
        <div id='signupContainer'>
            <h2 id='signupTitle'>Sign Up</h2>
            <form id='loginForm'>
                <table>
                    <tbody>
                        <tr>
                            <td> First Name </td>
                            <td> <input ref={firstName} type='text' />  </td>
                        </tr>
                        <tr>
                            <td> Last Name </td>
                            <td> <input ref={lastName} type='text' />  </td>
                        </tr>
                        <tr>
                            <td> City </td>
                            <td> <input ref={city} type='text' />  </td>
                        </tr>
                        <tr>
                            <td> Country </td>
                            <td> <input ref={country} type='text' />  </td>
                        </tr>
                        <tr>
                            <td> Description </td>
                            <td> <input ref={description} type='text' />  </td>
                        </tr>
                        <tr>
                            <td> Email </td>
                            <td> <input ref={email} type='email' />  </td>
                        </tr>
                        <tr>
                            <td> Password </td>
                            <td> <input ref={password} type='password' /> </td>
                        </tr>
                        <tr cols='2'>
                            <td> <button onClick={ event => handleSignup(event) } > Sign Up </button>  <span id='loginLink' onClick={ () => props.setAuthState('login') } >Login</span> </td>
                        </tr>
                        <tr >
                            <td colSpan='2' ref={signupError} className='signupError'>  </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Signup;