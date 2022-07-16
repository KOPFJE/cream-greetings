import { Button, Box } from '@mui/material';

const Navigation = (props) => {
    if(props.isRefreshedFlag) return(
        <Box>
            <Button onClick={props.getGreeting}>Get a new greeting</Button> <Button onClick={props.refreshGreetings}>Refresh greetings</Button>
        </Box>
    );
    return(
        <Box>
            <Button onClick={props.refreshGreetings}>Refresh greetings</Button>
        </Box>
    );
};

export default Navigation;

