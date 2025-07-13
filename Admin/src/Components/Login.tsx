import axios from 'axios';
import { Button } from './ui/button'
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

interface LoginProps {
    setToken: (token: string) => void; // setToken is a function that takes a string and returns void
}

const Login = ({ setToken }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-2'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>

                    {/* Email Address*/}

                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Add your email address' />
                    </div>

                    {/*Passowrd*/}

                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Add your email address' />
                    </div>
                    <Button className='w-full mt-2 py-2 px-4 cursor-pointer'>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login