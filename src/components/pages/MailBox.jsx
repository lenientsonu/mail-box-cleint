import { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../Layout/Header";
import Inbox from "../MailBox/Inbox";
import SentBox from "../MailBox/SentBox";

import "./MailBox.css";

const MailBox = () => {
    const [inbox, setInbox] = useState(true);
    const totalUnread = useSelector((state) => state.mails.totalUnreadMails);

    const showInboxHandler = (event) => {
        event.preventDefault();
        setInbox(true);
    };

    const showSentboxHandler = (event) => {
        event.preventDefault();
        setInbox(false);
    };

    return (
        <div className='mailbox'>
            <Header />
            <h2 className='mailbox__header'>
                <button
                    className='mailbox__header__btn mailbox__header__btn_1'
                    onClick={showInboxHandler}
                >
                    Inbox
                    <span className='unread__badge'>{totalUnread}</span>
                </button>
                <button
                    className='mailbox__header__btn mailbox__header__btn_2'
                    onClick={showSentboxHandler}
                >
                    Sent Mails
                </button>
            </h2>
            {inbox && <Inbox />}
            {!inbox && <SentBox />}
        </div>
    );
};

export default MailBox;
