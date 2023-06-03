import { useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import ListGroup from "react-bootstrap/ListGroup";

import MailList from "./MailList";

import { mailsAction } from "../../store/mailsSlice";

import "./box.css";

const SentBox = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const sentMails = useSelector((state) => state.mails.sentMails);

    const getFromServer = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://mail-box-client-6e4dd-default-rtdb.asia-southeast1.firebasedatabase.app/${email.replace(
                    /[@.]/g,
                    ""
                )}/sentmails.json`
            );
            const mailsFromServer = Object.keys(response.data).map((key) => {
                return { id: key, ...response.data[key] };
            });
            dispatch(mailsAction.addSentMails(mailsFromServer));
            console.log("fetched sent mails");
        } catch (error) {
            alert(error);
        }
    }, [email, dispatch]);

    useEffect(() => {
        setInterval(() => {
            getFromServer();
        }, 2000);
    }, [getFromServer]);

    return (
        <ListGroup className='mails'>
            <h2 className='mails__header'>Sent Mails</h2>
            {sentMails.map((mail) => {
                return (
                    <MailList
                        id={mail.id}
                        mail={mail.sentTo}
                        subject={mail.subject}
                        message={mail.content}
                        type='sentbox'
                    />
                );
            })}
        </ListGroup>
    );
};

export default SentBox;
