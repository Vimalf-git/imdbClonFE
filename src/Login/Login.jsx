import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css'
import ApiService from '../Common/ApiService'
// import { LoginDataCon } from '../Context/LoginContext';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import * as Yup from 'yup'
function Login() {
    // const { loginTog, setLoginTog
    // } = useContext(LoginDataCon)
    const navigate = useNavigate();
    const loginVerify = async (value) => {
        try {
            const res = await ApiService.post('/login', value)
            if (res.status == 200) {
                toast.success("login success")
                sessionStorage.setItem('token', res.data.token)

                navigate('/home')
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
                sessionStorage.clear()
                navigate('/loginlanding')
            }
            else {
                toast.error("Error Occoured! Please try after some time")
                sessionStorage.clear()
                navigate('/loginlanding')
            }
        }

    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const scheme = Yup.object().shape({
        email: Yup.string().required("please enter your mail").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'enter valid mail format'),
        password: Yup.string().required('please enter your password')
    })
    return (
        <>
            <div className='loginPage'>
                <div className='loginCard'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#4481eb" }}>
                        Login Account
                    </Typography>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(value) => {
                            loginVerify(value)
                        }}
                        validationSchema={scheme}

                    >
                        {({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                            <form className='loginForm' onSubmit={handleSubmit}>
                                <div className="form-floating login-box  mb-3" >
                                    <TextField required id="outlined-basic" label="Email" variant="outlined" sx={{ width: '20em' }}
                                        onChange={handleChange}
                                        onBlur={handleBlur} error={errors.email && touched.email}
                                        name='email'
                                        helperText={errors.email && touched.email ? errors.email : ""}
                                    />
                                </div>
                                <div className="form-floating  mb-3">
                                    <TextField required id="outlined-basic" label="Password" variant="outlined"
                                        name='password'
                                        sx={{ width: '20em' }}
                                        onChange={handleChange}
                                        onBlur={handleBlur} error={errors.password && touched.password}
                                        helperText={errors.password && touched.password ? errors.password : ""}
                                        type={showPassword ? 'text' : 'password'} InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                        }}
                                    />
                                </div>
                                <div>
                                    <p>Use this for demo⬇️</p>
                                    <p>E-mail:-selvamvimaldz1@gmail.com</p>
                                    <p>Password:-vimal</p>
                                </div>
                                <div className='for-crt-link mb-3'>
                                    <Link style={{ textDecoration: 'none', color: '#4481eb' }} to='/forgotPass'>Forget password?</Link>
                                    {/* <Link style={{ textDecoration: 'none', color: '#4481eb' }} to='/signup'>New to Here?</Link> */}
                                </div>
                                <div className="d-grid">
                                    <Button variant='contained' className='loginBtn'
                                        type='submit'>
                                        Login in
                                    </Button>
                                </div>
                            </form>)}
                    </Formik>
                </div>
                <div className="singupCon">
                    <p>---------- or ----------</p>
                    <Button variant='contained' className='loginBtn'
                    onClick={()=>{navigate('/signup')}}
                        type='submit'>
                        Create Account
                    </Button>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}

export default Login