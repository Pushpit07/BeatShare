import React, { Fragment } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info";


function App() {
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" exact component={() => <HomePage />} />
                    <Route path="/info" exact component={() => <Info />} />
                    <Route path="/join" exact component={() => <JoinRoomPage />} />
                    <Route path="/create" exact component={() => <CreateRoomPage />} />
                    <Route path="/room/:roomCode" render={(props) => { return <Room {...props} /> }} />
                </Switch>
            </Router>
        </Fragment>
    );
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);