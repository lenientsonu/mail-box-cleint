import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Homepage from "./components/pages/Home";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import Forgot from "./components/Login/Forgot";
// import ProfilePage from "./components/pages/Profile";
import Compose from "./components/pages/Compose";

import "./App.css";

const App = () => {
    const isAuth = useSelector((state) => state.auth.isLoggedIn);

    return (
        <main>
            <Switch>
                {/* <Route path='/' exact>
                        {isAuth && <Redirect to='/welcome' />}
                        {!isAuth && <Login />}
                    </Route>
                    <Route path='/welcome'>
                        {isAuth && <WelcomePage />}
                        {!isAuth && <Redirect to='/login' />}
                    </Route>
                    <Route path='/profile'>
                        {isAuth && <ProfilePage />}
                        {!isAuth && <Redirect to='/login' />}
                    </Route> */}
                <Route path='/home'>
                    {isAuth && <Homepage />}
                    {!isAuth && <Redirect to='/login' />}
                </Route>
                <Route path='/compose'>
                    {isAuth && <Compose />}
                    {!isAuth && <Redirect to='/login' />}
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/forgot'>
                    <Forgot />
                </Route>
            </Switch>
        </main>
    );
};

export default App;
