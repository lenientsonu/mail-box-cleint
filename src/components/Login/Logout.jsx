import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import "./Logout.css";

const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const clickHandler = (event) => {
        event.preventDefault();
        dispatch(authActions.logout());
        history.replace("/login");
    };

    return (
        <Button type='submit' onClick={clickHandler}>
            Logout
        </Button>
    );
};

export default Logout;
