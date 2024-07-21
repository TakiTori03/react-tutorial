import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { FaCog } from "react-icons/fa";
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword(!isRevealPassword);
    }

    const handleClickBtnLogin = async () => {
        //validate

        setIsLoading(true);
        //submit api
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            dispatch(doLogin(data));
            setIsLoading(false);
            navigate('/');
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className='login-container'>
                <div className='header'>
                    <span>Don't have an account yet?</span>
                    <button onClick={() => { navigate('/register') }}>Sign up</button>
                </div>
                <div className='title col-4 mx-auto'>
                    DEV&CODER
                </div>
                <div className='welcome col-4 mx-auto'>
                    Hello, who’s this?
                </div>
                <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type={"email"}
                            className='form-control'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group ' >
                        <label>Password</label>
                        <div className='input-icon-container'>
                            <input type={isRevealPassword ? 'text' : 'password'}
                                className='form-control'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <span
                                onClick={togglePassword}
                                className="icon"
                            >
                                {isRevealPassword ?
                                    <FaEye />
                                    :
                                    <FaEyeSlash />
                                }
                            </span>
                        </div>

                    </div>

                    <span className='forgot-password'> Forgot-Password</span>
                    <div>

                        <button className='btn-submit'
                            disabled={isLoading ? true : false}
                            onClick={() => handleClickBtnLogin()}>{isLoading && <FaCog className="loaderIcon" />}Log in</button>
                    </div>
                    <div className='text-center'>
                        <span className='back' onClick={() => { navigate('/') }}>&#60;&#60; Go to home page</span >
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;