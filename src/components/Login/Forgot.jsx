import React, { useRef, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Forgot = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();

    const sendLink = async (email) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmaC9PUexvjOMQr2wvhteHn23kFPTmuj0",
                {
                    requestType: "PASSWORD_RESET",
                    email: email,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
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
                <h2>Forgot Password</h2>
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

                {isLoading === true ? (
                    <p>Loading...</p>
                ) : (
                    <Button variant='primary' type='submit'>
                        Send Link
                    </Button>
                )}
                <br />
            </Form>

            <h3>
                Have an Account?
                <a href='/login'> Login</a>
            </h3>
        </>
    );
};

export default Forgot;
