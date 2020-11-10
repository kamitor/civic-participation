import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import { Lock } from '@material-ui/icons';

import Navbar from '../../components/Navbar/Navbar';
import { ConsumeAuth } from '../../hooks/authContext'

import { Data } from './Data';
import Card from './Card';
import ProgressBar from './ProgressBar';
import Chart from './Chart';

import './Vote.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const VoteTypography = withStyles({
    root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '28px'
    }
})(Typography);

const TitleHeaderTypography = withStyles({
    root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '21px'
    }
})(Typography);

const TitleContentTypography = withStyles({
    root: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '21px',
        color: '#E39696'
    }
})(Typography);

const UploadSmallTypographyCreate = withStyles({
    root: {
        fontSize: '15px',
        color: '#1261A3',
    }
})(Typography);


const VoteButton = withStyles({
    root: {
        backgroundColor: '#DBDBDB',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 36,
        padding: '0 20px',
        marginLeft: '10px',
        width: 142
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: '500'
    },
})(Button);

const UploadLock = withStyles({
    root: {
        color: '#1261A3'
    }
})(Lock);

export default function ProposalView() {
    const authContext = ConsumeAuth();

    const classes = useStyles();
    const history = useHistory();
    const [completed, setCompleted] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [totalvalue, setTotalValue] = useState(100000);

    const _handleVote = async () => {
        // TODO: get proposal Ids from global store/ context.
        const proposalIds = [];
        const proposalVoteRes = await authContext.civic.proposalVote(proposalIds);
        // TODO: Can we pass some proposal name or id to vote-success route so that we can display it in vote-success page?
        if (proposalVoteRes) {
            history.push("./vote-success")
        } else {
            console.log('Error occurred while voting the proposal, please try again');
        }

    }

    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
    });

    useEffect(() => {
        let tempData = 0
        Data.map((data) => {
            tempData = tempData + parseInt(data.budget)
        })
        setSelectedValue(formatter.format(tempData))
        setCompleted((tempData / totalvalue * 100))
    }, []);

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container direction="column" className="header-container">
                <Grid className="header-wraper">
                    <Grid container spacing={10}>
                        <Grid item container xs={6} direction="column" spacing={5}>
                            <Grid item>
                                <VoteTypography>Vote</VoteTypography>
                            </Grid>
                            <Grid item>
                                <TitleHeaderTypography>Please vote responsibly to upgrade the infrastructure in your neighbourhood for the benefit of all!</TitleHeaderTypography>
                            </Grid>
                            <Grid item container direction="column" spacing={2}>
                                <ProgressBar bgcolor={"#E39696"} completed={completed} selectedValue={selectedValue} />
                                <Grid item item container justify="flex-end">
                                    <TitleHeaderTypography>from budget of&nbsp;&nbsp;&nbsp;&nbsp;{formatter.format(totalvalue)}</TitleHeaderTypography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} direction="column" spacing={5} alignItems="center">
                            <Grid item>
                                <TitleHeaderTypography>Your votes by categories</TitleHeaderTypography>
                            </Grid>
                            <Grid item container xs justify="flex-end">
                                <Chart series={[44, 55, 13, 43, 22]} labels={['Urban', 'Urban', 'Urban', 'Urban', 'Urban']} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="main-container">
                <Grid container spacing={2}>
                    <Grid item container alignItems="center" justify="flex-end" className="button-wraper">
                        <Grid item>
                            <Grid item container className="tamper-wraper">
                                <Grid item>
                                    <UploadSmallTypographyCreate>tamper proof</UploadSmallTypographyCreate>
                                </Grid>
                                <Grid item>
                                    <UploadLock />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <VoteButton type="button" onClick={_handleVote}>VOTE</VoteButton>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justify="flex-end">
                        <TitleContentTypography>You have used more than the allocated budget</TitleContentTypography>
                    </Grid>
                </Grid>
                <Grid className="content-wraper">
                    <Grid container spacing={5}>
                        {Data.map((data, key) => {
                            return (
                                <Card
                                    title={data.title}
                                    description={data.description}
                                    budget={data.budget}
                                    key={key}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}