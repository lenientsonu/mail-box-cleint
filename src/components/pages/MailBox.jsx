import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Header from "../Layout/Header";
import MailList from "../Layout/MailList";

const MailBox = () => {
    const email = useSelector((state) => state.auth.email);
    const [mails, setMails] = useState([]);

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
            console.log(mailsFromServer);
            setMails(mailsFromServer);
        } catch (error) {
            console.log(error);
        }
    }, [email]);

    useEffect(() => {
        getFromServer();
    }, [getFromServer]);

    return (
        <>
            <Header />
            <MailList mails={mails} />
        </>
    );
};

export default MailBox;
