import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import {
	GreenTextTypography,
	GreenSmallTypographyCreate,
	TitleTextTypography,
	TitleText1Typography,
	CreateButton,
	CreateLock,
	LogoCreateUserIcon,
	LogoCreateTitle,
	backgroundStyle,
	ValidatiionPasswordString
} from '../components/Themes';
import '../assets/styles/login.scss'

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [repassword, setRepassword] = useState("");
	const [passwordValation, setPasswordValidation] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault();
		
		if (password.length < 8) {
			setPasswordValidation(true);
		}
	}

	const handleChangeUsername = (event) => {
		console.log(event.target.value);
		setUsername(event.target.value);
	}

	const handleChangeFirstname = (event) => {
		setFirstname(event.target.value);
	}

	const handleChangeLastname = (event) => {
		setLastname(event.target.value);
	}

	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	}

	const handleChangeRePassword = (event) => {
		setRepassword(event.target.value);
	}

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
							<TitleTextTypography variant="h4">shape</TitleTextTypography>
						</Grid>
						<Grid item>
							<TitleText1Typography>YOUR CITY</TitleText1Typography>
						</Grid>
						<Grid item>
							<TitleTextTypography variant="h5">in new ways</TitleTextTypography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid container item xs={6} spacing={0} className="col-item col-right">
				<Grid container direction="column" justify="center" alignContent="center" className="login-inner">
					<Grid container direction="row" justify="flex-start" alignContent="center" alignItems="center">
						<Grid item className="logo-wrap">
							<LogoCreateUserIcon />
						</Grid>
						<Grid item className="login-margin">
							<LogoCreateTitle>Create account</LogoCreateTitle>
						</Grid>
					</Grid>
					<form onSubmit={handleSubmit}>
						<Grid container direction="column" justify="center" alignContent="center">
							<Grid item className="input-login">
								<TextInput
									label="Create username"
									name="username"
									handleChangeInput={handleChangeUsername}
									color="blue"
								/>
							</Grid>
							<Grid item className="input-login">
								<TextInput
									label="First name"
									name="firstname"
									onChange={handleChangeFirstname}
									color="blue"
								/>
							</Grid>
							<Grid item className="input-login">
								<TextInput
									label="Last name"
									name="lastname"
									onChange={handleChangeLastname}
									color="blue"
								/>
							</Grid>
							<Grid className="input-login">
								<PasswordInput
									label="Enter your password"
									name="password"
									onChange={handleChangePassword}
									color="blue"
								/>
							</Grid>
							{passwordValation && (
								<ValidatiionPasswordString>
									At least 8 characters
								</ValidatiionPasswordString>
							)}
							<Grid className="input-login">
								<PasswordInput
									label="Enter your confirm password"
									name="repassword"
									onChange={handleChangeRePassword}
									color="blue"
								/>
							</Grid>
						</Grid>
						<Grid container item justify="center" alignContent="center">
							<Link className="login_account_link" href="/login">
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
