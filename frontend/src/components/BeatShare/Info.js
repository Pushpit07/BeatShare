import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Info(props) {
    const pages = {
        JOIN: 'pages.join',
        CREATE: 'pages.create'
    };

    const [infoPage, setInfoPage] = useState(pages.JOIN);

    const _joinInfo = () => {
        return "Beat Share is a platform to collaboratively listen music with your friends/family. The host creates a room and any number of members can join it with the Room Code. Each member in the room can play/pause the current song and even skip it.";
    }

    const _createInfo = () => {
        return "The host sets up play/pause controls while creating the room and can update the room settings later if needed. Members in the room need to vote to skip the current song. If the votes in favour exceed the votes required as set by the host, then the current song is skipped.";
    }

    return (
        <Grid id="beatShare_homepage">
            <Grid container className="center justify-content-center index_1">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4" className="beatShare_text mb-2">
                        What is Beat Share?
                    </Typography>
                </Grid>
                <div className="row mt-4 mb-2">
                    <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8 offset-1 col-10 text-gray text-center">{infoPage === pages.JOIN ? _joinInfo() : _createInfo()}</div>
                </div>
                <Grid item xs={12} align="center">
                    <IconButton onClick={() => { infoPage === pages.CREATE ? setInfoPage(pages.JOIN) : setInfoPage(pages.CREATE) }}>
                        {infoPage === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                    </IconButton>
                </Grid>
                <Grid align="center">
                    <Link to="/">
                        <button className="btn btn-primary text-gray mt-4">
                            Back
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
    )
}