import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';

const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setconfPass] = useState('');
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
        }

        return () => {
            //
        }
    }, [userInfo])

    const submitFormHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }
    console.log(userRegister);
    return (
        <div className="form">
            <form onSubmit={submitFormHandler}>
                <ul className="form-container">
                    <li>
                        <h3 className="text-center">Create Account</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="confPass">Confirm Password</label>
                        <input type="password" name="confPass" id="confPass" placeholder="Confirm Password" onChange={(e) => setconfPass(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="btn primary">Create Account  <i className="fas fa-user-plus"></i></button>
                    </li>
                    <li>
                        Have an account?
                    </li>
                    <li>
                        <Link to="/signin" className="btn button secondary text-center">Sign In <i className="fas fa-sign-in-alt"></i></Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Register;
