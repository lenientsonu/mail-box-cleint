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
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBPBsv5yucMhZZJeE8XIccwuZMrF31hrx8",
                {
                    requestType: "PASSWORD_RESET",
                    email: email,
                }
            );
            console.log(response.data);
        } catch (error) {
            alert(error.response.data.error.message);
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

                <Button type='submit' disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Link"}
                </Button>
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
