import { Button, Box } from '@mui/material';

const Navigation = (props) => {
    return(
        <Box>
            <Button onClick={props.getGreeting}>Get a new greeting</Button> <Button onClick={props.refreshGreetings}>Refresh the greetings</Button>
        </Box>
    );
};

export default Navigation;

