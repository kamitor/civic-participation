import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import { Lock } from '@material-ui/icons';

import ProposalCategory, { toLabel as categoryToLabel } from "../../types/proposals/categories";

import Navbar from '../../components/Navbar/Navbar';
import { ConsumeAuth } from '../../hooks/authContext'
import { ConsumeVote } from '../../hooks/voteContext'

import Card from './Card';
import ProgressBar from './ProgressBar';
import Chart from './Chart';

import './Vote.scss'
import { mapObj } from '../../services/objects';

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

export default function Vote() {
    const authContext = ConsumeAuth();
    const voteContext = ConsumeVote();

    const classes = useStyles();
    const history = useHistory();
    const [completed, setCompleted] = useState(0);
    const [selectedValue, setSelectedValue] = useState(0);
    const [chartValues, setChartValues] = useState({ series: [], labels: [] });
    // total budget
    const [budgetLimit, _] = useState(100000);

    // On delete button click in proposal
    const handleDelete = (proposalId) => {
        // Filter the not deleted proposals and update the context with them
        const remainingProposals = voteContext.proposals.filter(proposal => proposal.proposalId !== proposalId);
        voteContext.setProposals(remainingProposals);
    }
    // On vote button click
    const _handleVote = async () => {
        // TODO: get proposal data from global store/ context.
        const proposalIds = voteContext.proposals.map(proposal => proposal.proposalId);
        await authContext.civic.proposalVote(proposalIds);
        history.push("./vote-success")
    }

    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
    });

    useEffect(() => {
        const totalProposalBudget = voteContext.proposals.reduce((acc, curr) => acc + parseFloat(curr.budget), 0);
        // For currency
        setSelectedValue(formatter.format(totalProposalBudget));
        // For progressbar
        setCompleted((totalProposalBudget / budgetLimit * 100));

        // For chart
        const series = [], labels = [];
        mapObj(ProposalCategory, (key, val) => {
            labels.push(categoryToLabel(val));
            let num = voteContext.proposals.reduce((total, proposal) => {
                if (proposal.category === val) return total + proposal.budget
                else return total;
            }, 0);
            series.push(num)
        })
        console.log('Vote', series, labels);
        setChartValues({ series, labels });

    }, [voteContext.proposals]);

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
                                    <TitleHeaderTypography>from budget of&nbsp;&nbsp;&nbsp;&nbsp;{formatter.format(budgetLimit)}</TitleHeaderTypography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} direction="column" spacing={5} alignItems="center">
                            <Grid item>
                                <TitleHeaderTypography>Your votes by categories</TitleHeaderTypography>
                            </Grid>
                            <Grid item container xs justify="flex-end">
                                {completed !== 0 && <Chart series={chartValues.series} labels={chartValues.labels} />}
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
                            <VoteButton type="button" onClick={_handleVote} disabled={!completed || (completed > 100)}>VOTE</VoteButton>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" justify="flex-end">
                        {completed > 100 && <TitleContentTypography>You have used more than the allocated budget</TitleContentTypography>}
                    </Grid>
                </Grid>
                <Grid className="content-wraper">
                    <Grid container spacing={5}>
                        {voteContext.proposals.map((data, key) => {
                            return (
                                <Card
                                    title={data.title}
                                    description={data.description}
                                    budget={data.budget}
                                    photo={data.photo}
                                    proposalId={data.proposalId}
                                    key={key}
                                    onDelete={handleDelete}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}