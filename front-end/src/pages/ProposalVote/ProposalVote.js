import { makeStyles } from '@material-ui/core';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

export default function Login() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar />
            <div>
                Proposal vote
            </div>
        </div>
    )
}
