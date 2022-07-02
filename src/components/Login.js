import  { GoogleLogin } from 'react-google-login';

const clientID = "763523850373-1tddmg1gmu1mc6imepsrqmui72pga934.apps.googleusercontent.com";

const Login = (props) => {
    const onSuccess = (response) => {
        console.log("LOGIN SUCCESSUL! Current user: ", response.profileObj);
    };
    
    const onFailure = (response) => {
        console.log("LOGIN FAILURE! Response: ", response);
    };

    return(
        <div>
            <GoogleLogin 
                clientId={clientID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default Login;