import React, { useState } from 'react'
import './ForgotPass.css'
import ApiService from '../Common/ApiService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function ForgotPass() {

    const [mail, setMail] = useState("");
    const mailSend = async () => {
        try {
            if (mail !== "") {
                const res = await ApiService.post('/forgetpass', { email: mail })
                if (res.status === 200) {
                    toast.success('verification mail sent')
                }
            } else {
                toast.error('please enter your mail')
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('verification failed')

            } else {
                toast.error(error.message)

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
                    <Link to={'/login'}>LoginPage</Link>
                    <button onClick={() => { mailSend() }}
                    >send </button>
                </div>
            </div>

        </>
    )
}

export default ForgotPass