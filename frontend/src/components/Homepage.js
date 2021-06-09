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
                    <Grid container spacing={3} className="beatShare_homepage_content_center index_1">
                        <Grid item xs={12} align="center">
                            <Typography variant="h3" component="h3">
                                Beat Share
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center" className="mt-1 mb-5">
                            <ButtonGroup variant="contained">
                                <Button className="beatShare_btn_hover" color="primary" variant="contained" to="/join" component={Link}>
                                    Join a Room
                                </Button>
                                <Button className="beatShare_btn_hover" color="secondary" to="/create" component={Link}>
                                    Create a Room
                            </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} align="center" className="mt-5">
                            <Button className="beatShare_btn_hover white_outlined_button" variant="outlined" to="/info" component={Link}>
                                Info
                            </Button>
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