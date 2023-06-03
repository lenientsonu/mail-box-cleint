import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import useAxios from "../../hooks/use-axios";

import { authActions } from "../../store/authSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const Login = (props) => {
    const { loading, error, sendRequest } = useAxios();
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passRef = useRef();
    const history = useHistory();

    //firebase auth
    const authenticate = async (email, password) => {
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPBsv5yucMhZZJeE8XIccwuZMrF31hrx8";
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const response = await sendRequest(url, "post", data);
        if (!error && response) {
            console.log(response);
            dispatch(
                authActions.login({
                    token: response.idToken,
                    email: email,
                })
            );
            history.replace("/home");
        } else {
            alert(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passRef.current.value;

        // validation
        if (!emailValue || !passValue) {
            alert("Enter All The Fields !!");
        } else {
            authenticate(emailValue, passValue);
        }
    };

    const forgotHandler = (event) => {
        event.preventDefault();
        history.replace("/forgot");
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h1 className='form__header'>Log In</h1>
                <FloatingLabel
                    controlId='floatingInput'
                    label=''
                    className='mb-3'
                >
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        ref={emailRef}
                    />
                </FloatingLabel>
                <FloatingLabel controlId='floatingPassword' label=''>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        ref={passRef}
                    />
                </FloatingLabel>

                <Button type='submit' disabled={loading}>
                    {loading ? "Logging In" : "Login"}
                </Button>
                <br />
                <Button className='forgot-btn' onClick={forgotHandler}>
                    Forgot password?
                </Button>
                <h3 className='form__footer'>
                    Don't have a Account?
                    <NavLink to='/signup'>SignUp</NavLink>
                </h3>
            </Form>
        </>
    );
};

export default Login;
