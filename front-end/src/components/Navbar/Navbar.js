import React, { useState } from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import logo from '../../assets/image/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    navbar: {
        width: '100%',
        height: 85,
        backgroundColor: '#C4C4C4',
    },
    logo: {
        width: 60,
        height: 60
    },
    logoImage: {
        margin: 'auto',
        display: 'block',
        maxHeight: '100%',
        maxWidth: '100%'
    },
    logoWrap: {
        marginLeft: 80
    },
    searchWrap: {
        maxWidth: 385,
        maxHeight: 67,
        minWidth: 330,
        border: '1px solid #fff',
        borderRadius: 50,
        justifyContent: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        "& .MuiInput-underline:before": {
            borderColor: '#009688'
        },
        padding: 3
    },
    inputLabel: {
        color: "rgba(0, 0, 0, 0.5393)",
        "&.Mui-focused": {
            color: "#599C6D"
        }
    },
    searchIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#009688',
        padding: 7,
        borderRadius: '50%',
        color: '#fff',
        marginLeft: 58
    },
    buttonWrap: {
        marginLeft: 250
    }
}))

const LogoTitle = withStyles({
    root: {
        color: '#1261A3',
        fontWeight: 500,
        fontSize: '30px',
    }
})(Typography);

const NavbarTitle = withStyles({
    root: {
        color: '#1261A3',
        fontWeight: '400',
        fontSize: '18px',
        lineHeight: '12px'
    }
})(Typography);

const CreateButton = withStyles({
    root: {
        backgroundColor: '#1261A3',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 36,
        padding: '0 20px',
        marginLeft: '50px',
        '&:hover': {
            backgroundColor: '#1261A3'
        }
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: '500'
    },
})(Button);

export default function Navbar() {
    const classes = useStyles();
    const [state, setState] = useState({
        type: '',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div className={classes.root}>
            <Grid item container className={classes.navbar} alignItems="center">
                <Grid item container sm alignItems="center" className={classes.logoWrap}>
                    <Grid item className={classes.logo}>
                        <img src={logo} className={classes.logoImage} />
                    </Grid>
                    <LogoTitle>Civic</LogoTitle>
                </Grid>
                <Grid item container sm alignItems="center" className={classes.searchWrap}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="type-select" className={classes.inputLabel}>Status</InputLabel>
                            <Select
                                native
                                value={state.type}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'type',
                                    id: 'type-select',
                                }}
                            >
                                <option aria-label="" value="" />
                                <option value="Proposed">Proposed</option>
                                <option value="Reviewing by gov">Reviewing by gov</option>
                                <option value="Approved by gov">Approved by gov</option>
                                <option value="Rejected by gov">Rejected by gov</option>
                                <option value="Voteable">Voteable</option>
                                <option value=" Vote passed"> Vote passed</option>
                                <option value="Vote failed">Vote failed</option>
                                <option value="Executing by gov">Executing by gov</option>
                                <option value="Closed">Closed</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.searchIcon}>
                        <SearchIcon />
                    </Grid>
                </Grid>
                <Grid item container sm alignItems="center" className={classes.buttonWrap}>
                    <NavbarTitle>Dashboard</NavbarTitle>
                    <CreateButton>CREATE</CreateButton>
                </Grid>
            </Grid>
        </div>
    );
}
