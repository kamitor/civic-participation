import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, Typography, Checkbox, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/image/header.png';
import { Stars, ExpandMore, ExpandLess, Lock, AccountCircle, Info, NaturePeople } from '@material-ui/icons';
import { withStyles } from "@material-ui/core/styles";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import LocationGooglMap from '../../components/Location/LocationGooglMap';
import { useForm } from "react-hook-form";
import Navbar from '../../components/Navbar/Navbar';
import Timeline from './Timeline';
import './ProposalEdit.scss';

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

const CategoryCheckbox = withStyles({
    root: {
        color: '#599C6D',
        fontSize: '12px',
        '&$checked': {
            color: '#599C6D',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

const CategoryPeopleIcon = withStyles({
    root: {
        color: '#000000',
        fontSize: 15,
    }
})(NaturePeople);

const CatergoryItemTyography = withStyles({
    root: {
        fontSize: '12px',
        color: 'rgba(1, 1, 1, 1)',
        lineHeight: '14.06px',
        fontWeight: '400'
    }
})(Typography);

export default function ProposalDetail() {
    const classes = useStyles();
    const [stateCheckBox, setStateCheckBox] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
    });
    const [valueBudget, setValueBudget] = useState();
    const [state, setState] = useState({
        type: '',
        status: ''
    });
    const [description, setDescription] = useState({
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit amet, consectetur adipisicing rl Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl Lorem ipsum dolor sit ame"
    });
    const [hasErrorType, setHasError] = useState(false)
    const [hasErrorStatus, setHasErrorStatus] = useState(false)
    const [hasErrorCateory, setHasErrorCategory] = useState(false)
    const [hasErrorDescription, setHasErrorDescription] = useState(false)
    const [hasErrorTitle, setHasErrorTitle] = useState(false)
    const [title, setTitle] = useState("")
    const [showHistory, setShowHistory] = useState(true)
    const { errors, handleSubmit } = useForm({
        criteriaMode: "all"
    });
    const onSubmit = data => {
        // Title validation
        if (title == "") {
            setHasErrorTitle(true);
        } else {
            setHasErrorTitle(false)
        }
        // Type validation
        if (state.type == "") {
            setHasError(true);
        } else {
            setHasError(false)
        }
        // Categories validation
        for (const [key, value] of Object.entries(stateCheckBox)) {
            if (value == true) {
                setHasErrorCategory(false)
                break;
            } else {
                setHasErrorCategory(true)
            }
        }
        // Description validation
        if (description.content.length >= 100 && description.content.length <= 580) {
            setHasErrorDescription(false)
        } else {
            setHasErrorDescription(true)
        }

    };

    const handleChange = (event) => {
        const name = event.target.name;
        if (event.target.value == "") {
            setHasError(true)
        } else {
            setHasError(false)
        }
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleChangeStatus = (event) => {
        const name = event.target.name;
        if (event.target.value == "") {
            setHasErrorStatus(true)
        } else {
            setHasErrorStatus(false)
        }
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleChangeCheckboxs = (event) => {
        if (event.target.checked) {
            setHasErrorCategory(false);
        } else {
            setHasErrorCategory(true)
        }
        setStateCheckBox({ ...stateCheckBox, [event.target.name]: event.target.checked });
    };

    const CHARACTER_LIMIT = 580;

    const handleChangeDescription = content => event => {
        if (event.target.value.length >= 100 && event.target.value.length <= 580) {
            setHasErrorDescription(false)
        } else {
            setHasErrorDescription(true)
        }
        setDescription({ ...description, [content]: event.target.value });
    };

    const handleChangeTitle = (e) => {
        if (e.target.value == "") {
            setHasErrorTitle(true)
        } else {
            setHasErrorTitle(false)
        }
        setTitle(e.target.value)
    }

    const handleCollapse = () => {
        setShowHistory(!showHistory)
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                    <Grid className="hearder-wraper">
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
                            {hasErrorTitle && <FormHelperText>Please select a title.</FormHelperText>}
                        </Grid>
                    </Grid>
                    <div className="main-container-proposal-edit">
                        <Grid container>
                            <Grid item xs={12} container>
                                <Grid item xs={4} container spacing={1} direction="column">
                                    <Grid item>
                                        <MainTitleTyography>Edit User input</MainTitleTyography>
                                    </Grid>
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
                                        InputProps={{
                                            classes: {
                                                input: classes.input
                                            }
                                        }}
                                        className={classes.currencyInput}
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
                                            <option aria-label="" value="" />
                                            <option value="new">New</option>
                                            <option value="upgrade">Upgrade</option>
                                            <option value="remove">Remove</option>
                                        </Select>
                                        {hasErrorType && <FormHelperText>Please select a type.</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item container className="category-wraper" direction="column" spacing={1}>
                                    <Grid item>
                                        <TitleCategoryTypography className={classes.categoryTitle}>Categories</TitleCategoryTypography>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedA}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedA" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>Urban</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedB}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedB" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container>
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category2</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedC}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedC" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category4</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedD}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedD" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category5</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedE}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedE" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>Urban</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedF}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedF" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category2</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedG}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedG" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category4</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} container alignItems="center">
                                            <Grid item>
                                                <FormControlLabel
                                                    control={
                                                        <CategoryCheckbox
                                                            checked={stateCheckBox.checkedH}
                                                            onChange={handleChangeCheckboxs}
                                                            name="checkedH" />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs container >
                                                <CategoryPeopleIcon />
                                                <CatergoryItemTyography>category5</CatergoryItemTyography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className="checkbox-helper">
                                        {hasErrorCateory && <FormHelperText>Please select a type.</FormHelperText>}
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
                            <Grid item xs={12} className="description-helper">
                                {hasErrorDescription && <FormHelperText>Description must be at min 100 to 580 characters. </FormHelperText>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="googlmap-wrape">
                                <LocationGooglMap location={{ lat: 52.1135031, lng: 4.2829047 }} zoom={15} />
                            </div>
                        </Grid>
                        <Grid item xs={12} container className="government-wraper" alignItems="center">
                            <Grid item container>
                                <Grid item xs={4}>
                                    <MainTitleTyography>Government additions</MainTitleTyography>
                                </Grid>
                                <Grid item xs={6} className="status-wrape">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="status-select" className={classes.inputLabel}>Status</InputLabel>
                                        <Select
                                            native
                                            value={state.status}
                                            onChange={handleChangeStatus}
                                            inputProps={{
                                                name: 'status',
                                                id: 'status-select',
                                            }}
                                            errors={errors}
                                        >
                                            <option aria-label="" value="" />
                                            <option value="status">status</option>
                                        </Select>
                                        {hasErrorStatus && <FormHelperText>Please select a status.</FormHelperText>}
                                    </FormControl>
                                </Grid>
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
