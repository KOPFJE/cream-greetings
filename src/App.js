import Navigation from './components/Navigation';
import Greeting from './components/Greeting';
import Login from './components/Login';
import Logout from './components/Logout';
import { useEffect, useState } from "react";
import { Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { gapi } from 'gapi-script';
import axios from 'axios';

const CLIENT_ID = "763523850373-1tddmg1gmu1mc6imepsrqmui72pga934.apps.googleusercontent.com";
const API_KEY = "AIzaSyCWJPcv9W87PFGe093DCz6mCQ7VVOSANnM";
const SCOPES = "https://www.googleapis.com/auth/documents";



function App() { 
  const [greetingList, setGreetingList] = useState([]);
  const [greeting, setGreeting] = useState("Hello you creamy individuals!");

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };
    gapi.load('client:auth2', start);
  });        

  const getFile = async () => {
    try {
      const greetings = [];
      const atoken = gapi.auth.getToken().access_token;
      const data = await axios.get(`https://docs.googleapis.com/v1/documents/1F3gsZxBq1aztYDNZgH6MZWmRD2luPmb5WdaJVDwcF9M`, 
        { headers: { "Authorization" : `Bearer  ${atoken}` }}).then(res => res.data);
      console.log(data);
      data.body.content.map((row, index) => { 
        if(index !== 0) {
          const greetingText = row.paragraph.elements[0].textRun.content;
          if(greetingText !== "\n" && greetingText !== "")
            greetings.push(greetingText.replace(/(\n)/, ""));
        } 
      });
      console.log(greetings);
      setGreetingList(greetings);
    } catch (ex) {
      console.error(ex);
    }
  }

  const getGreeting = (e) => {
    e.preventDefault();
    const greeting = greetingList[Math.floor(Math.random()  * greetingList.length)];
    setGreeting(greeting);
  }

  const refreshGreetings = async (e) => {
    e.preventDefault();
    await getFile();
    console.log("Painoitkin tästä.");
  }

  return (
    <div id="content">
      <div id="wrapper">
      <Box>
        <Typography variant="h2">Creamy greetings</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row'}} >
          <Login /> <Logout />
        </Box>
        <Navigation getGreeting={getGreeting} refreshGreetings={refreshGreetings} />
        <Greeting greeting={greeting} />
        <footer>
          <p>Made with <FavoriteIcon className="heart" /> by Lauri Niskanen</p>
        </footer>
      </Box>
    </div>
    </div>
  );
}

export default App;
