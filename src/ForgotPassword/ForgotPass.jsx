import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { ForwardToInbox } from '@mui/icons-material';
import './ForgotPass.css'
import ApiService from '../Common/ApiService';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ForgotPass() {

    const [mail, setMail] = useState("");
    const mailSend = async () => {
        try {
            if (mail !== "") {
                const res = await ApiService.post('/forgetpass', { email: mail })
                if (res.status === 200) {
                    toast.success('check your mail')
                }
            } else {
                toast.error('please enter your mail')
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('Invalid mail')
            } else {
                toast.error(error.response.data.message);
            }
        }
    }
    return (
        <>
            <div className='forgetPass'>
                <div className='forgetPass-r'>
                    <h1>
                        Forget Password
                    </h1>

                    <input value={mail} placeholder='Email' name='Mail' onChange={(e) => setMail(e.target.value)}
                    />
                    <Link to={'/login'}><ArrowBackIcon/>LoginPage</Link>
                    <Button onClick={() => { mailSend() }} 
                        variant='contained' className='forgetBtn'
                    >
                        send &nbsp;<ForwardToInbox />
                    </Button>
                </div>
            </div>

        </>
    )
}

export default ForgotPass