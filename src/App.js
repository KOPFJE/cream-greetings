import Navigation from './components/Navigation';
import Greeting from './components/Greeting';
import Login from './components/Login';
import Logout from './components/Logout';
import { useEffect } from "react";
import { Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { gapi } from 'gapi-script';

const CLIENT_ID = "763523850373-1tddmg1gmu1mc6imepsrqmui72pga934.apps.googleusercontent.com";
const API_KEY = "AIzaSyCWJPcv9W87PFGe093DCz6mCQ7VVOSANnM";
const SCOPES = "https://www.googleapis.com/auth/drive";

function App() { 

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };
    gapi.load('client:auth2', start);
  }, []);

  const greeting = "Hello you creamy individuals!";

  const getGreeting = (e) => {
    e.preventDefault();
    console.log("Painoit tuosta.");
  }

  const refreshGreetings = (e) => {
    e.preventDefault();
    console.log("Painoitkin tästä.");
  }

  return (
    <div id="content">
      <Box>
        <Typography variant="h2">Creamy greetings</Typography>
        <Login /> <Logout />
        <Navigation getGreeting={getGreeting} refreshGreetings={refreshGreetings} />
        <Greeting greeting={greeting} />
        <footer>
          <p>Made with <FavoriteIcon /> by Lauri Niskanen</p>
        </footer>
      </Box>
    </div>
  );
}

export default App;
