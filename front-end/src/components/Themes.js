import { Typography, Grid } from '@material-ui/core';
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import background from './../assets/image/background.png';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    Button: {
      backgroundColor: '#227B3C', color: '#fff'
    }
});

const GreenTextTypography = withStyles({
    root: {
        fontSize: '72px',
        color: '#227B3C',
    }
})(Typography);

const GreenSmallTypography = withStyles({
    root: {
        fontSize: '15px',
        color: '#227B3C',
    }
})(Typography);

const GreenSmallTypographyCreate = withStyles({
    root: {
        fontSize: '15px',
        color: '#1261A3',
    }
})(Typography);

const ValidatiionPasswordString = withStyles({
    root: {
        fontSize: '15px',
        color: '#C4C4C4',
    }
})(Typography);


const ValidatiionLoginString = withStyles({
    root: {
        fontSize: '15px',
        color: '#C4C4C4',
    }
})(Typography);

const TitleTextTypography = withStyles({
    root: {
        color: '#FAFFFB',
        fontWeight: 'bold',
        fontSize: '50px'
    }
})(Typography);

const TitleText1Typography = withStyles({
    root: {
        color: '#FAFFFB',
        fontWeight: 500,
        fontSize: '72px',
        fontWeight: 500,
    }
})(Typography);

const LoginButton = withStyles({
    root: {
        backgroundColor: '#227B3C',
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

const LoginLock = withStyles({
    root: {
        color: '#227B3C'
    }
})(Lock);

const CreateLock = withStyles({
    root: {
        color: '#1261A3'
    }
})(Lock);

const LogoIcon = withStyles({
    root: {
        color: '#227B3C',
        fontSize: 30,
        lineHeight: 0
    }
})(AccountCircle);

const LogoCreateUserIcon = withStyles({
    root: {
        color: '#1261A3',
        fontSize: 30,
        lineHeight: 0
    }
})(AccountCircle);

const TitleLoginTypography = withStyles({
    root: {
        color: '#227B3C',
        fontSize: '30px',
        lineHeight: '35px'
    }
})(Typography);

const LogoCreateTitle = withStyles({
    root: {
        color: '#1261A3',
        fontSize: '30px',
        lineHeight: '35px'
    }
})(Typography);

const backgroundStyle = {
    style: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 15 %',
    },
};

export {
    theme,
    GreenTextTypography,
    GreenSmallTypography,
    TitleTextTypography,
    TitleText1Typography,
    LoginButton,
    LoginLock,
    LogoIcon,
    TitleLoginTypography,
    backgroundStyle,
    LogoCreateUserIcon,
    LogoCreateTitle,
    CreateButton,
    CreateLock,
    GreenSmallTypographyCreate,
    ValidatiionPasswordString,
    ValidatiionLoginString
}