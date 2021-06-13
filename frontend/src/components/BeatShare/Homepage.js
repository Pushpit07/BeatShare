import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';


export default function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    const _checkUserInRoom = async () => {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code)
            });
    };

    useEffect(() => {
        _checkUserInRoom();
    }, [roomCode]);

    return (
        <Fragment>
            {roomCode ? <Redirect to={`/room/${roomCode}`} />
                :
                <Grid id="beatShare_homepage">
                    <Grid container className="center justify-content-center index_1">
                        <Grid item xs={12} align="center">
                            <div className="mb-3"><img src="https://img.icons8.com/carbon-copy/400/000000/audio-wave--v2.png" width="100px" /></div>
                            <Typography variant="h3" component="h3" className="beatShare_text mb-2">
                                Beat Share
                            </Typography>
                        </Grid>

                        <Grid item xs={12} align="center" className="mt-5 mb-5">
                            <Link to="/join">
                                <button className="btn btn-primary text-dark mr-4">
                                    Join a Room
                                </button>
                            </Link>
                            <Link to="/create">
                                <button className="btn btn-primary ml-3">
                                    Create a Room
                                </button>
                            </Link>
                        </Grid>

                        <Grid item xs={12} align="center" className="mt-5">
                            <Link to="/info">
                                <button className="btn btn-primary text-info">
                                    Info
                                </button>
                            </Link>
                        </Grid>
                    </Grid>

                    <ul className="beatShare_animation_box_area">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </Grid>

            }
        </Fragment>
    )
}