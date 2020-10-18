import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar';
import Card from './Card';
import Map from './Map';
import { ConsumeAuth } from '../../hooks/authContext';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainContainer: {
        marginTop: 30
    },
    cardWrap: {
        maxWidth: 800,
        margin: 'auto',
        maxHeight: 780,
        overflowY: 'auto'
    },
}))

function Dashboard(props) {
    const classes = useStyles();
    const [proposalList, setProposalList] = useState([]);
    // const [latitude, setLatitude] = useState();
    // const [longitude, setLongitude] = useState();
    const [location, setLocation] = useState({ lat: null, lng: null, title: null });
    const authContext = ConsumeAuth();
    const history = useHistory();

    useEffect(() => {
        async function main() {
            if (!await authContext.isLoggedIn()) {
                history.push('/login');
                return;
            }
            const proposals = await authContext.civic.proposalList();
            setProposalList(proposals);
        }

        main();
    }, []);

    const setMapToProposal = (title, location) => {
        console.log('setMapToProposal')
        // setLatitude(parseFloat(location.split(",")[0]))
        // setLongitude(parseFloat(location.split(",")[1]))
        setLocation({
            lat: parseFloat(location.split(",")[0]),
            lng: parseFloat(location.split(",")[1]),
            title: title
        })
    }

    const navigateToProposal = (proposalId) => {
        history.push(`/proposals/${proposalId}`);
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column">
                <Grid item>
                    <Navbar />
                </Grid>
                <Grid item container className={classes.mainContainer}>
                    <Grid item container xs={6}>
                        <Grid item container className={classes.cardWrap}>
                            {proposalList.map(proposal =>
                                <Grid item xs={6} key={proposal.proposalId}>
                                    <Card
                                        title={proposal.title}
                                        description={proposal.description}
                                        imageUrl={proposal.photos}
                                        onClick={() => setMapToProposal(proposal.title, proposal.location)}
                                        onButtonClick={() => navigateToProposal(proposal.proposalId)}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container xs={6}>
                        <Map location={{ lat: location.lat, lng: location.lng }} title={location.title} proposalList={proposalList} zoom={15} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;