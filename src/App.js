import Navigation from './components/Navigation';
import Greeting from './components/Greeting';
import { useState } from "react";
import { Typography, Box, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGoogleLogin } from '@react-oauth/google';

import axios from 'axios';

const SCOPES = "https://www.googleapis.com/auth/documents.readonly";



function App(clientID) { 
  const [greetingList, setGreetingList] = useState([]);
  const [adjectivesList, setAdjectivesList] = useState([]);
  const [objectsList, setObjectsList] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isRefreshedFlag, setIsRefreshedFlag] = useState(false);
  const [aToken, setAToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAToken(tokenResponse.access_token);
      setIsLoggedIn(!isLoggedIn)
      console.log(tokenResponse);
    },
    onError: (error) => console.log(error),
    scope: SCOPES
  });

  const getFile = async () => {
    let isWhichHeading = 0;
    try {
      const greetings = [];
      const adjectives = [];
      const objects = [];
      console.log(aToken);
      const data = await axios.get(`https://docs.googleapis.com/v1/documents/1F3gsZxBq1aztYDNZgH6MZWmRD2luPmb5WdaJVDwcF9M`, 
        { headers: { "Authorization" : `Bearer  ${aToken}` }}).then(res => res.data);
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
          {isLoggedIn ? <Button onClick={login}>Change Google account</Button> : <Button onClick={login}>Login with Google</Button> }
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
