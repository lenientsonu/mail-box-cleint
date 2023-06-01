import React, { useState, useRef } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const SignUp = (props) => {
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();
    const cnfrmPassRef = useRef();

    // auth for firebase
    const saveToServer = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPBsv5yucMhZZJeE8XIccwuZMrF31hrx8",
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            );
            console.log(response.data);
            alert("User signed up successfully");
        } catch (error) {
            alert(error.response.data.error.message);
        } finally {
            setLoading(false);
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
                saveToServer(emailValue, passValue);
            }
        }
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h1>Sign Up</h1>
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
                <h3>
                    Have an Account?
                    <a href='/login'> Login</a>
                </h3>
            </Form>
        </>
    );
};

export default SignUp;
