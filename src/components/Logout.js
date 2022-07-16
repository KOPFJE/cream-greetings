import  { GoogleLogout } from 'react-google-login';

const clientID = "763523850373-1tddmg1gmu1mc6imepsrqmui72pga934.apps.googleusercontent.com";

const Logout = (props) => {
    const onSuccess = () => {
        console.log("Log out successful!");
        
    }

    return(
        <div>
            <GoogleLogout
                clientId={clientID}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
};

export default Logout;
