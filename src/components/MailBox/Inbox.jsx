import { useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import ListGroup from "react-bootstrap/ListGroup";
import MailList from "./MailList";

import { mailsAction } from "../../store/mailsSlice";
import "./box.css";

const Inbox = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const recievedMails = useSelector((state) => state.mails.recievedMails);
    const totalUnreadMails = recievedMails.reduce(
        (count, mail) => (mail.unRead ? count + 1 : count),
        0
    );
    dispatch(mailsAction.updateUnRead(totalUnreadMails));

    const getFromServer = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://mail-box-client-6e4dd-default-rtdb.asia-southeast1.firebasedatabase.app/${email.replace(
                    /[@.]/g,
                    ""
                )}/recivedmails.json`
            );
            const mailsFromServer = Object.keys(response.data).map((key) => {
                return { id: key, ...response.data[key] };
            });
            dispatch(mailsAction.addRecievedMails(mailsFromServer));
        } catch (error) {
            alert(error);
        }
    }, [email, dispatch]);

    useEffect(() => {
        getFromServer();
    }, [getFromServer]);

    return (
        <ListGroup className='mails'>
            <h2 className='mails__header'>Inbox</h2>
            {recievedMails.map((mail) => {
                return (
                    <MailList
                        id={mail.id}
                        unRead={mail.unRead}
                        mail={mail.recievedFrom}
                        subject={mail.subject}
                        message={mail.content}
                    />
                );
            })}
        </ListGroup>
    );
};

export default Inbox;
