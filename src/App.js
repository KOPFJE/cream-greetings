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
const SCOPES = "https://www.googleapis.com/auth/documents.readonly";



function App() { 
  const [greetingList, setGreetingList] = useState([]);
  const [adjectivesList, setAdjectivesList] = useState([]);
  const [objectsList, setObjectsList] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isRefreshedFlag, setIsRefreshedFlag] = useState(false);

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
    let isWhichHeading = 0;
    try {
      const greetings = [];
      const adjectives = [];
      const objects = [];
      const atoken = gapi.auth.getToken().access_token;
      const data = await axios.get(`https://docs.googleapis.com/v1/documents/1F3gsZxBq1aztYDNZgH6MZWmRD2luPmb5WdaJVDwcF9M`, 
        { headers: { "Authorization" : `Bearer  ${atoken}` }}).then(res => res.data);
      data.body.content.map((row, index) => { 
        if(index !== 0) {
          let rowText = row.paragraph.elements[0].textRun.content;
          if(rowText !== "\n" && rowText !== "") {
            rowText = rowText.replace(/(\n)/, "");
            if(isWhichHeading === 1) {
              rowText.split("|").map(greeting => {
                greetings.push(greeting);
              });
              isWhichHeading = 0;
            }
            if(isWhichHeading === 2) {
              rowText.split("|").map(adjective => {
                adjectives.push(adjective);
              });
              isWhichHeading = 0;
            }
            if(isWhichHeading === 3) {
              rowText.split("|").map(object => {
                objects.push(object);
              });
              isWhichHeading = 0;
            }
            if(rowText === "Greetings") {
              isWhichHeading = 1;
            }
            if(rowText === "Adjectives") {
              isWhichHeading = 2;
            }
            if(rowText === "Objects") {
              isWhichHeading = 3;
            }
          }
        } 
      });
      setGreetingList(greetings);
      setAdjectivesList(adjectives);
      setObjectsList(objects);
    } catch (ex) {
      console.error(ex);
    }
  }

  const getGreetingEvent = (e) => {
    e.preventDefault();
    getGreeting();
  }

  const getGreeting = () => {
    const greet = greetingList[Math.floor(Math.random()  * greetingList.length)];
    const adjective = adjectivesList[Math.floor(Math.random()  * adjectivesList.length)];
    const object = objectsList[Math.floor(Math.random()  * objectsList.length)];
    const givenGreeting = `${greet} you ${adjective} ${object}!`;
    setGreeting(givenGreeting);
  }

  const refreshGreetings = async (e) => {
    e.preventDefault();
    await getFile().then(setIsRefreshedFlag(true));
  }

  return (
    <div id="content">
      <div id="wrapper">
      <Box>
        <Typography variant="h2">Creamy greetings</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row'}} >
          <Login /> <Logout />
        </Box>
        <Navigation isRefreshedFlag={isRefreshedFlag} getGreeting={getGreetingEvent} refreshGreetings={refreshGreetings} />
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
