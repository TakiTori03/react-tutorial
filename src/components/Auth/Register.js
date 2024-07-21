import { useState } from "react";
import './Register.scss'
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");


    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword(!isRevealPassword);
    }

    const handleRegister = async () => {
        //validate

        //call api
        if (confirmPassword === password) {
            let data = await postRegister(email, username, password);
            console.log(data);
            if (data && data.EC === 0) {
                toast.success(data.EM);
                navigate('/login');
            }
            if (data && data.EC !== 0) {
                toast.error(data.EM);
            }
        } else {
            toast.error("incorrect re Password");
        }
    }

    return (
        <div className="signup-container">

            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => { navigate('/login') }}>Login</button>
            </div>
            <div className='title col-4 mx-auto' >
                Dev&Coder
            </div>
            <div className="welcome col-4 mx-auto">
                Get better data with conversational forms, surveys, quizzes & more.
            </div>
            <div className='content-form col-4 mx-auto' >
                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>User name</label>
                    <input type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div className="input-icon-container">
                        <input type={isRevealPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="form-control" />
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

                <div className="form-group">
                    <label>Re Password</label>
                    <input type={isRevealPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="form-control" />
                </div>
                <div>
                    <button className='btn-submit'
                        onClick={() => handleRegister()}>Register</button>
                </div>
            </div>
        </div>

    )
}
export default Register;