import React, { Fragment } from 'react'
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

export default function MusicPlayer(props) {
    const songProgress = (props.time / props.duration) * 100;

    const _skipSong = () => {
        console.log('skip')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch("/spotify/skip", requestOptions);
    }

    const _pauseSong = () => {
        console.log('paused')
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch("/spotify/pause", requestOptions);
    }

    const _playSong = () => {
        console.log('play')
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch("/spotify/play", requestOptions)
            .then((response) => console.log(response))
    }


    return (
        <Fragment>
            <Grid container justify="center">
                <div class="container">
                    <div class="row mb-5">
                        <div class="col-12 col-lg-12">
                            <div class="card bg-primary shadow-inset border-light p-3">
                                <div class="card-body shadow-soft border border-light rounded p-4">

                                    <div className="row text-center align-items-center justify-content-center">
                                        <div className="col-12 col-sm-4" align="center">
                                            <img src={props.image_url} height="100%" width="100%" className="song_img" />
                                        </div>
                                        <div className="col-12 col-sm-8" align="center">
                                            <Typography component="h5" variant="h5" className="room_page_song_name">
                                                {props.title}
                                            </Typography>
                                            <Typography color="textSecondary" variant="subtitle1">
                                                {props.artist}
                                            </Typography>
                                            <div className="room_page_controls">
                                                <IconButton onClick={() => { props.is_playing ? _pauseSong() : _playSong() }}>
                                                    {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                                                </IconButton>
                                                <IconButton onClick={() => _skipSong()}>
                                                    <span className="votes_required">{props.votes} / {props.votes_required}</span>
                                                    <SkipNextIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                    <LinearProgress variant="determinate" value={songProgress} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Grid>
        </Fragment>
    )
}