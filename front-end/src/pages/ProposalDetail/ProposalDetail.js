import React, { useState, useEffect } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/image/header.png';
import { Stars, ExpandMore, ExpandLess, Lock } from '@material-ui/icons';
import { withStyles } from "@material-ui/core/styles";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationGooglMap from '../../components/Location/LocationGooglMap';
import { useForm } from "react-hook-form";
import Navbar from '../../components/Navbar/Navbar';
import Timeline from './Timeline';
import CategoryItem from './CategoryItem';
import './ProposalDetail.scss';
import { useHistory, useParams } from "react-router-dom";
import { ConsumeAuth } from '../../hooks/authContext';
import { toLabel as typeToLabel } from '../../types/proposals/type';
import { toLabel as categoryToLabel } from '../../types/proposals/categories';
import ProposalStatus, { toDefinition } from '../../types/proposals/status';
import settings from '../../settings';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    input: {
        "&::placeholder": {
            color: "#599C6D",
            fontSize: 14,
            opacity: 1
        },
        textAlign: "left"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    inputLabel: {
        color: "#599C6D",
        "&.Mui-focused": {
            color: "#599C6D"
        }
    },
    categoryTitle: {
        paddingTop: '10px'
    },
    margin: {
        margin: theme.spacing(5),
    },
    commonText: {
        marginLeft: "20px",
        "& .MuiInputBase-input": {
            paddingBottom: '5px'
        },
        "& label.Mui-focused": {
            color: '#ffffff',
            fontSize: '18px'
        },
        "& .MuiInputBase-root.MuiInput-underline:after": {
            borderBottomColor: '#ffffff',
        },
        "& .MuiInput-underline:before": {
            borderBottom: "none"
        },
        "& label + .MuiInput-formControl": {
            marginTop: '10px',
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none"
        },
        "& .makeStyles-inputLabel-118": {
            color: "#ffffff",
            fontSize: "25px"
        }
    },
    inputTitle: {
        color: "white",
        width: "200px",
        fontSize: "32px",
        disableUnderline: true
    },
    inputLabelTitle: {
        color: "white",
        fontSize: "25px",
    },
    image: {
        width: 450,
        height: 294,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 450,
        marginRight: 25
    },
    currencyInput: {
        width: '80%'
    }
}));

const HearderCustomizeStar = withStyles({
    root: {
        color: '#FFFFFF',
        width: '28px',
        height: '28px',
        marginBottom: '6px'
    }
})(Stars)

const TitleCategoryTypography = withStyles({
    root: {
        color: '#599C6D',
        fontWeight: 500,
        fontSize: '15px',
    }
})(Typography);

const AddToVoteButton = withStyles({
    root: {
        backgroundColor: '#1261A3',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 36,
        padding: '0 20px',
        marginLeft: '10px'
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: '500'
    },
})(Button);

const UploadSmallTypographyCreate = withStyles({
    root: {
        fontSize: '15px',
        color: '#1261A3',
    }
})(Typography);

const StatusTyography = withStyles({
    root: {
        fontSize: '12px',
        color: 'rgba(89, 156, 109, 1)',
        lineHeight: '14.06px',
        fontWeight: '400'
    }
})(Typography);

const MainTitleTyography = withStyles({
    root: {
        fontSize: '20px',
        color: 'rgba(18, 97, 163, 1)',
        lineHeight: '26.6px',
        fontWeight: '600'
    }
})(Typography);

const GovernmentTitleTyography = withStyles({
    root: {
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.5393)',
        lineHeight: '16x',
        fontWeight: '400'
    }
})(Typography);

const GovernmentContentMiddleTyography = withStyles({
    root: {
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 1)',
        lineHeight: '16.41px',
        fontWeight: '400'
    }
})(Typography);

const GovernmentContentSmallTyography = withStyles({
    root: {
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 1)',
        lineHeight: '16.41px',
        fontWeight: '400'
    }
})(Typography);

const CollapseTyography = withStyles({
    root: {
        fontSize: '12px',
        color: 'rgba(18, 97, 163, 1)',
        lineHeight: '16px',
        fontWeight: '400'
    }
})(Typography);

const UploadLock = withStyles({
    root: {
        color: '#1261A3'
    }
})(Lock);


export default function ProposalDetail() {
    const { proposal_id } = useParams();

    const classes = useStyles();

    const [valueBudget, setValueBudget] = useState(20000);

    const [state, setState] = useState({
        type: 'new',
    });

    const [description, setDescription] = useState({
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing rl Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit ame"
    });

    const [title, setTitle] = useState("")

    const [showHistory, setShowHistory] = useState(true)

    const { errors, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const authContext = ConsumeAuth();
    const history = useHistory();
    const [proposal, setProposal] = useState();
    const [proposalHistory, setProposalHistory] = useState();
    const [showButtons, setShowButtons] = useState({
        vote: false,
        edit: false
    });

    async function getProposal() {
        const proposalRes = await authContext.civic.proposalGet(proposal_id);
        const proposalState = {
            title: proposalRes.title,
            description: proposalRes.description,
            category: categoryToLabel(proposalRes.category),
            budget: proposalRes.budget,
            type: typeToLabel(proposalRes.type),
            location: proposalRes.location,
            status: toDefinition(proposalRes.status),
            regulations: proposalRes.regulations,
            comment: proposalRes.comment
        }
        console.log('proposalState', proposalState);

        if (authContext.isGov) {
            setShowButtons({
                vote: false,
                edit: true
            })
        } else {
            if (proposalRes.status === ProposalStatus.Approved) {
                setShowButtons({
                    vote: true,
                    edit: false
                })
            }
        }
        setProposal(proposalState);
    }

    async function getHistory() {
        const historyRes = await authContext.civic.proposalHistory(proposal_id);
        const historyState = [];
        for (let historyItem of historyRes) {
            const txUrl = `${settings.eosio.blockExplorerUrl}/tx/${historyItem.txId}`;

            historyState.push({
                txUrl: txUrl,
                name: historyItem.authHumanCommonName,
                gov: historyItem.gov,
                comment: historyItem.comment,
                timestamp: historyItem.timestamp.toLocaleDateString('nl-NL'),
                status: toDefinition(historyItem.status)
            })
        }
        console.log('historyState', historyState)
        setProposalHistory(historyState);
    }

    useEffect(() => {
        async function main() {
            if (!await authContext.isLoggedIn()) {
                history.push('/login');
                return;
            }
            getProposal();
            getHistory();
        }
        main();
    }, [])

    const onSubmit = data => {
        console.log(data);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const CHARACTER_LIMIT = 580;

    const handleChangeDescription = content => event => {
        setDescription({ ...description, [content]: event.target.value });
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleCollapse = () => {
        setShowHistory(!showHistory)
    }

    function onVote() {
        // TODO add to vote state (new context)
        history.push('/proposals-vote');
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                    <Grid className="hearder-wraper-proposal">
                        <img src={background} className="hearder-img" />
                        <Grid container direction="row" className="hearder-title" alignItems="center">
                            <HearderCustomizeStar />
                            <TextField
                                label="Name your idea"
                                className={classes.margin, classes.commonText}
                                InputProps={{
                                    className: classes.inputTitle
                                }}
                                InputLabelProps={{
                                    className: classes.inputLabelTitle,
                                }}
                                value={title}
                                onChange={handleChangeTitle}
                            />
                        </Grid>
                    </Grid>
                    <div className="main-container-proposal">
                        <Grid container>
                            <Grid item xs={12} container>
                                <Grid item xs={4} container spacing={1} direction="column">
                                    <Grid item>
                                        <StatusTyography>Status</StatusTyography>
                                    </Grid>
                                    <Grid item>
                                        <MainTitleTyography>Ready for voting</MainTitleTyography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8} container spacing={2} alignItems="center" justify="flex-end" className="button-wraper">
                                    {showButtons.vote && (
                                        <Grid item>
                                            <AddToVoteButton type="button" onClick={onVote}>ADD TO VOTE</AddToVoteButton>
                                        </Grid>
                                    )}
                                    {showButtons.edit && (
                                        <Grid item>
                                            <AddToVoteButton type="button" onClick={() => history.push(`/proposal/${proposal_id}/edit`)}>EDIT</AddToVoteButton>
                                        </Grid>
                                    )}
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} container className="item-wraper">
                            <Grid item xs={4} container direction="column">
                                <Grid item>
                                    <CurrencyTextField
                                        value={valueBudget}
                                        currencySymbol="€"
                                        outputFormat="string"
                                        decimalCharacter="."
                                        digitGroupSeparator=","
                                        placeholder="Budget"
                                        onChange={(event, value) => setValueBudget(value)}
                                        className={classes.currencyInput}
                                        InputProps={{
                                            classes: {
                                                input: classes.input
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item className="type-wrape">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="type-select" className={classes.inputLabel}>Type</InputLabel>
                                        <Select
                                            native
                                            value={state.type}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: 'type',
                                                id: 'type-select',
                                            }}
                                            errors={errors}
                                        >
                                            <option aria-label="type" />
                                            <option value="new">New</option>
                                            <option value="upgrade">Upgrade</option>
                                            <option value="remove">Remove</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item container className="category-wraper" direction="column" spacing={2}>
                                    <Grid item>
                                        <TitleCategoryTypography className={classes.categoryTitle}>Categories</TitleCategoryTypography>
                                    </Grid>
                                    <Grid item container spacing={2}>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="Urban" />
                                        </Grid>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="catogory2" />
                                        </Grid>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="catogory4" />
                                        </Grid>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="catogory5" />
                                        </Grid>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="Urban" />
                                        </Grid>
                                        <Grid item xs={6} container spacing={2} alignItems="center">
                                            <CategoryItem title="category2" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper className={classes.paper}>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="image" src="" />
                                    </ButtonBase>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container className="description-wraper">
                            <Grid item xs={11}>
                                <TextField
                                    label="Description"
                                    inputProps={{
                                        maxLength: CHARACTER_LIMIT,
                                    }}
                                    value={description.content}
                                    helperText={`${description.content.length}/${CHARACTER_LIMIT}`}
                                    onChange={handleChangeDescription("content")}
                                    margin="normal"
                                    multiline
                                    rows={10}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="googlmap-wrape">
                                <LocationGooglMap location={{ lat: 52.1135031, lng: 4.2829047 }} zoom={15} />
                            </div>
                        </Grid>
                        <Grid item xs={12} container className="government-wraper">
                            <Grid item>
                                <MainTitleTyography>Government additions</MainTitleTyography>
                            </Grid>
                            <Grid item container spacing={7}>
                                <Grid item xs={4} container direction="column" spacing={2} className="regulations-wraper">
                                    <Grid item>
                                        <GovernmentTitleTyography>Regulations</GovernmentTitleTyography>
                                    </Grid>
                                    <Grid item>
                                        <GovernmentContentMiddleTyography>ISO 5454313</GovernmentContentMiddleTyography>
                                        <GovernmentContentSmallTyography>- we will need to ensure that</GovernmentContentSmallTyography>
                                        <GovernmentContentMiddleTyography>ISO 5454313</GovernmentContentMiddleTyography>
                                        <GovernmentContentSmallTyography>- heathea</GovernmentContentSmallTyography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} container direction="column" spacing={2} className="comment-wraper">
                                    <Grid item>
                                        <GovernmentTitleTyography>Comment for latest update</GovernmentTitleTyography>
                                    </Grid>
                                    <Grid item>
                                        <GovernmentContentMiddleTyography>
                                            Please describe what you did with this update, this will be shown to the citizens in the history
                                        </GovernmentContentMiddleTyography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container className="history-wraper">
                            <Grid item container>
                                <Grid item>
                                    <MainTitleTyography>History</MainTitleTyography>
                                </Grid>
                                <Grid item xs={2} container className="collapse-wraper" direction="column" alignItems="center">
                                    <CollapseTyography onClick={handleCollapse}>COLLAPSE</CollapseTyography>
                                    {showHistory ? <ExpandLess /> : <ExpandMore />}
                                </Grid>
                            </Grid>
                            <Grid className="timeline-box-wraper">
                                {showHistory &&
                                    <Grid item container direction="column">
                                        <Timeline
                                            actionType="government"
                                            userName="Andrew Mishin"
                                            comment="- Contractor Dig it B.V. started the flower construction on 12 March"
                                            status="Actioned"
                                            time="14/04/2019"
                                            exploreUrl="tx/9fa0ac91c5293518bc563b5b1af9db33a8a60a2199b5e0d298f4307fa16997a4"
                                        />
                                        <Timeline
                                            userName="Jack Tanner"
                                            comment=" - Initial budget estimate and regulations added"
                                            status="Voting opened"
                                            time="14/04/2019"
                                            exploreUrl="tx/9fa0ac91c5293518bc563b5b1af9db33a8a60a2199b5e0d298f4307fa16997a4"
                                        />
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </form>
        </div>
    )
}
