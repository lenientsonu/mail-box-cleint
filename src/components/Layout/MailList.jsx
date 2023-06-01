import ListGroup from "react-bootstrap/ListGroup";

import "./MailList.css";

const MailList = (props) => {
    return (
        <ListGroup className='mails'>
            {props.mails.map((mail) => {
                return (
                    <>
                        <ListGroup.Item className='mail' key={mail.id}>
                            <span>{mail.sentTo}</span>
                            <p>{mail.subject}</p>
                        </ListGroup.Item>
                        {/* <hr /> */}
                    </>
                );
            })}
        </ListGroup>
    );
};

export default MailList;
