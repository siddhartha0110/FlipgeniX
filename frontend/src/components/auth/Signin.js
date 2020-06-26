import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../actions/userActions';

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn)
    const { loading, error, userInfo } = userSignIn;
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
        dispatch(signin(email, password));
    }

    return (
        <div className="form">
            <form onSubmit={submitFormHandler}>
                <ul className="form-container">
                    <li>
                        <h3 className="text-center">Signin to FlipgeniX</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
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
                        <button type="submit" className="btn primary">Sign In  <i className="fas fa-sign-in-alt"></i></button>
                    </li>
                    <li>
                        New to FlipgeniX?
                    </li>
                    <li>
                        <Link to="/register" className="btn button secondary text-center">Create Account <i className="fas fa-user-plus"></i></Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Signin;
