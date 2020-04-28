import React from 'react';
import './../../Style/Desktop/User_Profile/EditProfile.css';

let editorRef = React.createRef();

function EditProfile(props) {

    // addEventListener
   
    return (
        <div ref={editorRef} onClick={() => props.setEditor(false)}  id='editProfileGlobalWindow'>
            <div id='editProfileMainPanel' onClick={(e) => e.stopPropagation()} >
                <form>
                    <h3> Edit Profile </h3>
                    <table >
                        <tr>
                            <td> Profile Picture </td> 
                            <td> <input type='file' /> </td>
                        </tr>
                        <tr>
                            <td> First Name </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td> Last Name </td> 
                            <td> <input type='text' /> </td>  
                        </tr>
                        <tr>
                            <td> Description </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td> City </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td> Country </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td> New Password </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td> Confirm Password </td> 
                            <td> <input type='text' /> </td>
                        </tr>
                        <tr>
                            <td>  </td>
                            <td> 
                                <button id='editProfileSaveButton' onClick={(e)=> e.preventDefault()} > Save </button> 
                                {/* <span id='editProfileCancelButton' > Cancel </span> */}
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;