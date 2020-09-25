import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import {
	GreenTextTypography,
	TitleSmallTextTypography,
	TitleLargeTextTypography,
	backgroundStyle,
	ValidatiionString
} from '../../components/Themes';
import './CreateAccount.scss'

export default function Login() {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [repassword, setRepassword] = useState("");
	const [usernameValidation, setUsernameValidation] = useState(false);
	const [firstnameValidation, setFirstnameValidation] = useState(false)
	const [lastnameValidation, setLastnameValidation] = useState(false)
	const [passwordValidation, setPasswordValidation] = useState(false)
	const [repasswordValidation, setRepasswordValidation] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password.length < 8) {
			setPasswordValidation(true);

		} else if (password != repassword) {
			setRepasswordValidation(true)
		}
		if (username === "") {
			setUsernameValidation(true);
		}
		if (firstname === "") {
			setFirstnameValidation(true);
		}
		if (lastname === "") {
			setLastnameValidation(true);
		}
	}

	const handleChangeUsername = (event) => {
		setUsername(event.target.value);
		setUsernameValidation(false)
	}

	const handleChangeFirstname = (event) => {
		setFirstname(event.target.value);
		setFirstnameValidation(false);
	}

	const handleChangeLastname = (event) => {
		setLastname(event.target.value);
		setLastnameValidation(false);
	}

	const handleChangePassword = (event) => {
		setPasswordValidation(false);
		setRepasswordValidation(false);
		setPassword(event.target.value);
	}

	const handleChangeRePassword = (event) => {
		setRepassword(event.target.value);
		setRepasswordValidation(false);
	}

	const navigateLoginPage = () => {
		history.push("/login")
	}

	const GreenSmallTypographyCreate = withStyles({
		root: {
			fontSize: '15px',
			color: '#1261A3',
		}
	})(Typography);

	const CreateButton = withStyles({
		root: {
			backgroundColor: '#1261A3',
			borderRadius: 3,
			border: 0,
			color: 'white',
			height: 36,
			padding: '0 30px',
			marginLeft: '10px'
		},
		label: {
			textTransform: 'capitalize',
		},
	})(Button);

	const CreateLock = withStyles({
		root: {
			color: '#1261A3'
		}
	})(Lock);

	const LogoCreateUserIcon = withStyles({
		root: {
			color: '#1261A3',
			fontSize: 30,
			lineHeight: 0
		}
	})(AccountCircle);

	const LogoCreateTitle = withStyles({
		root: {
			color: '#1261A3',
			fontSize: '30px',
			lineHeight: '35px'
		}
	})(Typography);

	return (
		<Grid container spacing={0} direction="row">
			<Grid container item xs={6} spacing={0} className="col-item col-left">
				<Grid container direction="column" style={backgroundStyle.style}>
					<Grid container direction="column" justify="center" alignContent="center" className="subject-title">
						<GreenTextTypography variant="h3">
							Concious Cities
            			</GreenTextTypography>
					</Grid>
					<Grid container direction="column" justify="center" alignContent="center" className="description-title">
						<Grid item>
							<TitleSmallTextTypography variant="h4">shape</TitleSmallTextTypography>
						</Grid>
						<Grid item>
							<TitleLargeTextTypography>YOUR CITY</TitleLargeTextTypography>
						</Grid>
						<Grid item>
							<TitleSmallTextTypography variant="h5">in new ways</TitleSmallTextTypography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid container item xs={6} spacing={0} className="col-item col-right">
				<Grid container direction="column" justify="center" alignContent="center" className="create-inner">
					<Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
						<Grid item className="logo-wrap">
							<LogoCreateUserIcon />
						</Grid>
						<Grid item className="left-margin">
							<LogoCreateTitle>Create account</LogoCreateTitle>
						</Grid>
					</Grid>
					<form onSubmit={handleSubmit}>
						<Grid container direction="column" justify="center" alignContent="center">
							<Grid item className="input-create">
								<TextInput
									label="Create username"
									name="username"
									onChange={handleChangeUsername}
									color="blue"
								/>
							</Grid>
							{usernameValidation && (
								<ValidatiionString>
									Please enter a username.
								</ValidatiionString>
							)}
							<Grid item className="input-create">
								<TextInput
									label="First name"
									name="firstname"
									onChange={handleChangeFirstname}
									color="blue"
								/>
							</Grid>
							{firstnameValidation && (
								<ValidatiionString>
									Please enter a firstname.
								</ValidatiionString>
							)}
							<Grid item className="input-create">
								<TextInput
									label="Last name"
									name="lastname"
									onChange={handleChangeLastname}
									color="blue"
								/>
							</Grid>
							{lastnameValidation && (
								<ValidatiionString>
									Please enter a lastname.
								</ValidatiionString>
							)}
							<Grid className="input-create">
								<PasswordInput
									label="Enter your password"
									name="password"
									handleChangePassword={handleChangePassword}
									color="blue"
								/>
							</Grid>
							{passwordValidation && (
								<ValidatiionString>
									At least 8 characters
								</ValidatiionString>
							)}
							<Grid className="input-create">
								<PasswordInput
									label="Enter your confirm password"
									name="repassword"
									handleChangePassword={handleChangeRePassword}
									color="blue"
								/>
							</Grid>
							{repasswordValidation && (
								<ValidatiionString>
									Password are not matching.
								</ValidatiionString>
							)}
						</Grid>
						<Grid container item justify="center" alignContent="center">
							<Link className="create-account-link" onClick={navigateLoginPage}>
								LOGIN
           					</Link>
						</Grid>
						<Grid container item justify="center" alignContent="center">
							<ExpandLess />
						</Grid>
						<Grid container direction="row" justify="flex-end" alignItems="center">
							<Grid item>
								<GreenSmallTypographyCreate>
									encrypted
             					 </GreenSmallTypographyCreate>
							</Grid>
							<Grid item>
								<CreateLock />
							</Grid>
							<Grid item className="create-button">
								<CreateButton type="submit" >
									Create
              					</CreateButton>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</Grid>
	)
}
