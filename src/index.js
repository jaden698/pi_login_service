import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,Route,Redirect,Switch} from "react-router-dom";
import UserRoute from './Routes/user-routes'
import BoardStudent from './components/board-student'
import BoardTeacher from './components/board-teacher'
import BoardAdmin from './components/board-admin'



import App from "./App";

 
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact render={props => <App {...props} />} />
            <UserRoute path='/student' exact component={BoardStudent} />
            <UserRoute path='/teacher' exact component={BoardTeacher} />
            <UserRoute path='/admin' exact component={BoardAdmin} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>
    , document.getElementById("root")
);