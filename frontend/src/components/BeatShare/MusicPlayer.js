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
                <Card>
                    <Grid container alignItems="center">
                        <Grid item align="center" xs={4}>
                            <img src={props.image_url} height="100%" width="100%" />
                        </Grid>
                        <Grid item align="center" xs={8}>
                            <Typography component="h5" variant="h5">
                                {props.title}
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle1">
                                {props.artist}
                            </Typography>
                            <div>
                                <IconButton onClick={() => { props.is_playing ? _pauseSong() : _playSong() }}>
                                    {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                                </IconButton>
                                <IconButton onClick={() => _skipSong()}>
                                    <span className="votes_required">{props.votes} / {props.votes_required}</span>
                                    <SkipNextIcon />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <LinearProgress variant="determinate" value={songProgress} />
                </Card>
            </Grid>
        </Fragment>
    )
}