import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from "@material-ui/core";

export default function JoinRoomPage() {
    const history = useHistory();
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    const _handleTextFieldChange = (e) => {
        setRoomCode(e.target.value.toUpperCase());
    }

    const _roomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: roomCode
            })
        };

        fetch('/api/join-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push(`/room/${roomCode}`)
                } else {
                    setError("Room not found")
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <Fragment>
            <Grid container spacing={3} className="center">
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4' className="beatShare_text mb-3">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField error={error} placeholder="Enter a room code" value={roomCode} helperText={error} variant="outlined" onChange={_handleTextFieldChange} />
                </Grid>

                <Grid item xs={12} align="center" className="mt-4 mb-5">
                    <Link to="/">
                        <button className="btn btn-primary text-gray mr-4">
                            Back
                        </button>
                    </Link>
                    <button className="btn btn-primary text-success ml-3" onClick={_roomButtonPressed}>
                        Enter Room
                    </button>
                </Grid>
            </Grid>
        </Fragment >
    )
}