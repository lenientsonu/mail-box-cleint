import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import ListGroup from "react-bootstrap/ListGroup";
import deleteIcon from "../../assets/delete.png";

import { mailsAction } from "../../store/mailsSlice";

import "./box.css";

const MailList = ({ id, mail, subject, unRead, message, type }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const email = useSelector((state) => state.auth.email);

    const deleteFromServer = async (id, type) => {
        try {
            let whichUrl = "";
            if (type === "inbox") {
                whichUrl = "recivedmails";
            }
            if (type === "sentbox") {
                whichUrl = "sentmails";
            }
            await axios.delete(
                `https://mail-box-client-6e4dd-default-rtdb.asia-southeast1.firebasedatabase.app/${email.replace(
                    /[@.]/g,
                    ""
                )}/${whichUrl}/${id}.json`
            );
        } catch (error) {
            alert(error);
        }
    };

    const deleteMailHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // console.log(id);
        if (type === "inbox") {
            dispatch(mailsAction.removeRecievedMail(id));
        }
        if (type === "sentbox") {
            dispatch(mailsAction.removeSentMail(id));
        }
        deleteFromServer(id, type);
    };

    const readOnServer = async (id) => {
        try {
            await axios.put(
                `https://mail-box-client-6e4dd-default-rtdb.asia-southeast1.firebasedatabase.app/${email.replace(
                    /[@.]/g,
                    ""
                )}/recivedmails/${id}.json`,
                {
                    content: message,
                    recievedFrom: mail,
                    subject,
                    unRead: false,
                }
            );
        } catch (error) {
            alert(error);
        }
    };

    const readMailHandler = () => {
        dispatch(
            mailsAction.selectMail({
                mail,
                subject,
                message,
            })
        );
        dispatch(mailsAction.onRead(id));
        readOnServer(id);
        history.push("/readmail");
    };

    return (
        <ListGroup.Item className='mail' key={id} onClick={readMailHandler}>
            <span className={unRead ? "dot" : "no_dot"}></span>
            <span className="mail__mailer">{mail}</span>
            <p className='mail__item__subject'>{subject}</p>
            <img
                src={deleteIcon}
                alt='delete icon'
                className='mail__item__delete'
                onClick={deleteMailHandler}
            />
        </ListGroup.Item>
    );
};

export default MailList;
