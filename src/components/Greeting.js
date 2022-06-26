import {Box, Typography} from '@mui/material';

const Greeting = (props) => {
    return(
        <Box>
            <Typography variant="h3">{props.greeting}</Typography>
        </Box>
    );
};
export default Greeting;