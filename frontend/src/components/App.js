import React, { Fragment } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./BeatShare/Homepage";
import JoinRoomPage from "./BeatShare/JoinRoomPage";
import CreateRoomPage from "./BeatShare/CreateRoomPage";
import Room from "./BeatShare/Room";
import Info from "./BeatShare/Info";


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