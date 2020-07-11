import React from "react";
import { Route, Switch } from "react-router-dom";
import BaseContainer from "../views/Base/baseContainer";
// import Login from "../views/Login/index";
import NotFound from "../views/NotFound/index";

// User is LoggedIn
import PrivateRoute from "./PrivateRoute"
import SysInfo from "../views/SysInfo/index";


const Main = () => (
    <Switch>
        {/*User will LogIn*/}
        <Route path="/" component={BaseContainer} />
        {/* User is LoggedIn*/}
        <PrivateRoute
            exact path="/dashboard"
            component={SysInfo}
        // isAuthenticated={isLoggedIn() 
        />
        {/*Page Not Found*/}
        <Route component={NotFound} />
    </Switch>
);
export default Main;
