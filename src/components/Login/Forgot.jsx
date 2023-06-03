import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

import useAxios from "../../hooks/use-axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./SignUp.css";

const Forgot = () => {
    const { loading, error, sendRequest } = useAxios();
    const emailRef = useRef();

    const sendLink = async (email) => {
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBPBsv5yucMhZZJeE8XIccwuZMrF31hrx8";
        const data = {
            requestType: "PASSWORD_RESET",
            email: email,
        };
        const response = await sendRequest(url, "post", data);
        if (!error && response) {
            console.log(response);
        } else {
            alert(error);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailRef.current.value;
        sendLink(emailValue);
    };

    return (
        <>
            <Form className='form' onSubmit={submitHandler}>
                <h1 className='form__header'>Forgot Password</h1>
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

                <Button type='submit' disabled={loading}>
                    {loading ? "Sending..." : "Send Link"}
                </Button>
                <br />
                <h3 className='form__footer'>
                    Have an Account?
                    <NavLink to='/login'>Login</NavLink>
                </h3>
            </Form>
        </>
    );
};

export default Forgot;
