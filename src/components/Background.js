import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/emi.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
}));
function Background() {
    const classes=useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
        </div>
    )
}

export default Background
