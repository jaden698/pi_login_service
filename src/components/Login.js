import React, { useState } from 'react';
import {Grid,Paper,TextField,Button,Typography,Link} from '@material-ui/core';
import {ThemeProvider,createMuiTheme,withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import InputAdorment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import {useHistory} from 'react-router-dom'
import './Login.css'


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const paperStyle={display:'flex',padding:20,height:'75vh',width:320,margin:" 60px auto"}
const ColorButton = withStyles((theme) => ({
    root: {
      //color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  const OutlookButton = withStyles((theme) => ({
    root: {
      color:'#424242',
      backgroundColor: '#e0e0e0',
      fontFamily:'robot',
      textTransform:'capitalize',
      
      '&:hover': {
        color:'#fafafa',
        backgroundColor: '#039be5',
      },
    },
  }))(Button);


const Login=()=>{
    const history=useHistory()
        
    const [values, setValues] = useState({
        name: '',
        password:'',
        textChange: 'Sign In',
        showPassword:false,
    });
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { name, password, textChange } = values;
    const handleChange = text => e => {
        setValues({ ...values, [text]: e.target.value });
      };
    /*const handleChange=(e)=>{
        setValues({...values,password:e.target.value})
    }*/
    const handleClickShowPassword=()=>{
        setValues({...values,showPassword:!values.showPassword})
        //console.log(values.showPassword)
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(password)
        console.log(name)

        // setMessage("");
        setLoading(true)
        if (name && password) {
          setValues({ ...values, textChange: 'Submitting' });
          axios
            .post(`http://localhost:5000/api/auth/signin`, {
              "username":name,
              "password": password
            })
            .then(res => {
                // console.log(res)
                // console.log(isAuth())
                const cockie= isAuth()
                const roles=cockie.role[0]
                console.log(typeof roles)

                
                
      
                authenticate(res, () => {
                  console.log(res)
                 
                  setValues({
                    ...values,
                    name: '',
                    password: '',
                    textChange: 'Submitted'
                  });
                    if (roles == 'STUDENT') {
                        console.log(55)
                        history.push('/student')
                        setMessage(`Hey ${res.data.username}, Welcome back!`);
                    }
                    else if (roles === 'TEACHER') {
                        console.log(55)
                        history.push('/teacher')
                        setMessage(`Hey ${res.data.username}, Welcome back!`);
                    }
                    if (roles=== 'ADMIN') {
                        console.log(55)
                        history.push('/admin')
                        setMessage(`Hey ${res.data.username}, Welcome back!`);
                    }
              });
            })
            .catch(err => {
              setValues({
                ...values,
                name: '',
                password: '',
                textChange: 'Sign In'
              });
              console.log(err.response);
              setLoading(false)
              //setMessage(err.response.data.errors);
            });
        } /*else {
          setMessage('Please fill all fields');
        }*/
      };
    return (
       /* <div className={'box'}>

        </div>*/
        <Grid>
            <Paper elevation={10} style={paperStyle} >
                <Form onSubmit={handleSubmit}>
                    <Grid align='center'>
                        <div className={'logo'}>

                        </div>

                        <div>
                            <TextField 
                                   placeholder='Entrer votre nom'  
                                   fullWidth className='name' 
                                   variant="outlined"
                                   value={values.name}
                                   onChange={handleChange('name')}

                                InputProps={
                                    {
                                        endAdornment: <InputAdorment position="end">
                                            <IconButton>
                                                <PersonIcon />
                                            </IconButton>
                                        </InputAdorment>
                                    }}
                                    validations={[required]}
                                    
                            />
                            <TextField
                                placeholder='Entrer votre mot de passe'
                                type={values.showPassword ? 'text' : 'password'} fullWidth
                                className='password'
                                value={values.password}
                                variant="outlined"
                                onChange={handleChange('password')}
                                InputProps={
                                    {
                                        endAdornment: <InputAdorment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdorment>
                                    }
                                }
                                validations={[required]}
                            />
                        </div>
                        <ColorButton variant="contained" color="primary" className="logbtn" type>
                            Login
                    </ColorButton>
                        <div className='link'>
                            <Link href='#'>
                                Username/password oublié?
                        </Link>
                        </div>
                        <div className="leftline">

                        </div>
                        <div className="ou">
                            ou
                        </div>
                        <div className="rightline">

                        </div>
                        <OutlookButton variant="contained" color="primary" className='out'>
                            <div className="micro"></div>
                            <p>
                                Login with outlook
                        </p>
                        </OutlookButton>
                    </Grid>
                </Form>
            </Paper>
        </Grid>
    )
}

export default Login
