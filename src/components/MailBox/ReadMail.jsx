import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Header from "../Layout/Header";

import "./ReadMail.css";

const ReadMail = () => {
    const history = useHistory();
    const mail = useSelector((state) => state.mails.selectedMail);

    const backHandler = (event) => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <>
            <Header />
            <div className='read__mail'>
                <div className='mail__header'>
                    <button
                        className='mail__header__back'
                        onClick={backHandler}
                    >
                        Back
                    </button>
                    <span className='mail__header__subject'>
                        {mail.subject}
                    </span>
                </div>
                <div className='mail__mail'>{mail.mail}</div>
                <div className='mail__body'>{mail.message}</div>
            </div>
        </>
    );
};

export default ReadMail;
