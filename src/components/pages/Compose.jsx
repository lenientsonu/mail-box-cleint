import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./Compose.css";

const Compose = () => {
    const [editorInput, setEditorInput] = useState(EditorState.createEmpty());
    const emailInputRef = useRef();
    const subjectInputRef = useRef();
    const email = useSelector((state) => state.auth.email);

    const onEditorStateChange = (editorInput) => {
        setEditorInput(editorInput);
    };

    const sendToServer = async (toEmail, subject, mail) => {
        try {
            const response = await axios.post(
                `https://mail-box-client-6e4dd-default-rtdb.asia-southeast1.firebasedatabase.app/${email.replace(
                    /[@.]/g,
                    ""
                )}/sentmails.json`,
                {
                    sentTo: toEmail,
                    subject: subject,
                    content: mail,
                }
            );
            console.log(response.data);
            emailInputRef.current.value = "";
            subjectInputRef.current.value = "";
            setEditorInput(EditorState.createEmpty());
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const emailValue = emailInputRef.current.value;
        const subjectValue = subjectInputRef.current.value;
        const mailText = editorInput.getCurrentContent().getPlainText("\u0001");

        sendToServer(emailValue, subjectValue, mailText);
    };

    return (
        <Form className='form' onSubmit={onSubmitHandler}>
            <h1>Compose Email</h1>
            <FloatingLabel controlId='floatingInput' label='' className='mb-3'>
                <Form.Control
                    type='email'
                    placeholder='To..'
                    ref={emailInputRef}
                />
            </FloatingLabel>
            <FloatingLabel controlId='floatingPassword' label=''>
                <Form.Control
                    type='text'
                    placeholder='Subject..'
                    ref={subjectInputRef}
                />
            </FloatingLabel>

            <Editor
                editorState={editorInput}
                toolbarOnFocus
                toolbarClassName='toolbar'
                wrapperClassName='wrapper'
                editorClassName='editor'
                placeholder='Write your mail...'
                onEditorStateChange={onEditorStateChange}
            />

            <Button type='submit'>Send</Button>
        </Form>
    );
};

export default Compose;
