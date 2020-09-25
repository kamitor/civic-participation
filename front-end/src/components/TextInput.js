import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
    let color = '#227B3C';
    if (props.color === "blue") {
        color = '#1261A3';
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        commonText: {
            "& label.Mui-focused": {
                color: color,
            },
            "& .MuiInputBase-root.MuiInput-underline:after": {
                borderBottomColor: color,
            }
        }
    }));

    const classes = useStyles();

    return (
        <TextField
            className={classes.margin, classes.commonText}
            label={props.label}
            onChange={props.onChange}
            value={props.value}
        />
    )
}
