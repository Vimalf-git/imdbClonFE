import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import './ResetPassword.css'
import ApiService from '../Common/ApiService';
function ResetPassword() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [searchParam, setSearchparam] = useSearchParams();
    const token = searchParam.get('emailtoken');
    const id = searchParam.get('id');
    const getData = async () => {

        try {
            let res = await ApiService.get(`forgetpass/getres/${id}/${token}`)
            if (res.status == 200) {
                setMail(res.data.mail)
                toast.success('verified sucessfully')
            } else {
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const changePassword = async (e) => {
        try {
            const res = await ApiService.post('/forgetpass/updatepassword', {
                email: mail,
                password: pass
            })
            if (res.status === 200) {
                setPass(" ")
                navigate('/')
                toast.success('Password changed');
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                navigate('/forgotPass')
                toast.error('Invalid user')
            } else {
                navigate('/forgotPass')
                toast.error(error.response.data.message);
            }
        }
    }
    return (<>
        <div className='resetPass'>
            <div className='forgetPass-r'>
                <h1>
                    Reset Password
                </h1>
                <input
                    value={pass} placeholder='newPassword' onChange={(e) => setPass(e.target.value)}
                />
                <button onClick={() => { changePassword() }}
                >Change</button>
            </div>

        </div>
    </>
    )
}

export default ResetPassword