import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

import useAxios from "../../hooks/use-axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const SignUp = (props) => {
    const { loading, error, sendRequest } = useAxios();
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmPassRef = useRef();

    // auth for firebase
    const signUpToServer = async (email, password) => {
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPBsv5yucMhZZJeE8XIccwuZMrF31hrx8";
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        const response = await sendRequest(url, "post", data);
        if (!error && response) {
            console.log(response);
            console.log("User signed up successfully");
        } else {
            alert(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        const passValue = passRef.current.value;
        const cnfrmPassValue = cnfrmPassRef.current.value;

        // validation
        if ((emailValue, passValue, cnfrmPassValue)) {
            if (passValue !== cnfrmPassValue) {
                alert("Passwords Do Not Match !!");
            } else {
                signUpToServer(emailValue, passValue);
            }
        }
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h1 className='form__header'>Sign Up</h1>
                <small>* Enter all the Fields to sign up</small>
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
                <FloatingLabel controlId='floatingConfirmPassword' label=''>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        ref={cnfrmPassRef}
                    />
                </FloatingLabel>
                <Button type='submit' disabled={loading}>
                    {loading ? "Loading..." : "Sign Up"}
                </Button>
                <h3 className='form__footer'>
                    Have an Account?
                    <NavLink to='/login'>Login</NavLink>
                </h3>
            </Form>
        </>
    );
};

export default SignUp;
