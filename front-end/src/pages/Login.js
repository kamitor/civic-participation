import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Link } from '@material-ui/core';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import {
	GreenTextTypography,
	GreenSmallTypography,
	TitleTextTypography,
	TitleText1Typography,
	LoginButton,
	LoginLock,
	LogoIcon,
	TitleLoginTypography,
	backgroundStyle,
	ValidatiionLoginString
} from '../components/Themes';
import '../assets/styles/login.scss';

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameValidation, setUsernameValidation] = useState(false);
	const [passwordValidation, setPasswordValidation] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (username == "") {
			setUsernameValidation(true);
		} else if (password == "") {
			setPasswordValidation(true);
		}
	}

	const handleChangePassword = (event) => {
		setPassword(event.target.value);
		setPasswordValidation(false);
	}

	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
		setUsernameValidation(false);

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
							<LogoIcon />
						</Grid>
						<Grid item className="login-margin">
							<TitleLoginTypography>Login</TitleLoginTypography>
						</Grid>
					</Grid>
					<form onSubmit={handleSubmit}>
						<Grid container direction="column" justify="center" alignContent="center">
							<Grid item className="input-login">
								<TextInput
									label="Username"
									name="username"
									onChange={handleChangeUsername}
									color="green"
								/>
							</Grid>
							{usernameValidation && (
								<ValidatiionLoginString>
									Please enter a username.
								</ValidatiionLoginString>
							)}
							<Grid className="input-login">
								<PasswordInput
									label="Enter your password"
									name="password"
									handleChangePassword={handleChangePassword}
									color="green"
								/>
							</Grid>
							{passwordValidation && (
								<ValidatiionLoginString>
									Please enter a password.
								</ValidatiionLoginString>
							)}
						</Grid>
						<Grid container item justify="center" alignContent="center">
							<Link className="create_account_link" href="/">
								CREATE ACCOUNT
           					</Link>
						</Grid>
						<Grid container item justify="center" alignContent="center">
							<ExpandMore />
						</Grid>
						<Grid container direction="row" justify="flex-end" alignItems="center">
							<Grid item>
								<GreenSmallTypography>
									encrypted
             					 </GreenSmallTypography>
							</Grid>
							<Grid item>
								<LoginLock />
							</Grid>
							<Grid item className="login-button">
								<LoginButton type="submit">
									LOGIN
              					</LoginButton>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
		</Grid>
	)
}
