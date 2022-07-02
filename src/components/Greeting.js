import {Box, Typography, Button} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Greeting = (props) => {
    const copyGreeting = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(props.greeting);
    }

    return(
        <Box>
            <Typography variant="h3">{props.greeting}</Typography>
            <p className="center"><Button onClick={copyGreeting}><ContentCopyIcon /></Button></p>
        </Box>
    );
};
export default Greeting;