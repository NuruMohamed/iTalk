import React,{Fragment} from 'react';
import MainBody from './mainBody';
import Header from './header';
import './../Style/Desktop/desktopStyle.css';

function Desktop(props) {
    return (
            <div className='desktop'>     
                <Header/>
                <MainBody/>
            </div>
    );
}

export default Desktop;