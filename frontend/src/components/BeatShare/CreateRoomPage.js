import React, { Fragment, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function CreateRoomPage({ update = false, passVotesToSkip = 2, passGuestCanPause = true, passRoomCode = null, updateCallback = () => { }, updateShowSettingsCallback = () => { } }) {
    const history = useHistory();

    const [guestCanPause, setGuestCanPause] = useState(passGuestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(passVotesToSkip);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const _handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    }

    const _handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === "true" ? true : false);
    }

    const _handleRoomCreation = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            })
        };

        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => history.push("/room/" + data.code));
    }

    const _handleRoomUpdation = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: passRoomCode
            })
        };

        fetch("/api/update-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    setSuccessMsg("Room updated successfully!");
                } else {
                    setErrorMsg("Error updating room...");
                }
                updateCallback();
            });
    }

    const _renderCreateButtons = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={_handleRoomCreation}>Create Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        )
    }

    const _renderUpdateButton = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={_handleRoomUpdation}>Update Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={() => updateShowSettingsCallback(false)}>Close</Button>
                </Grid>
            </Grid>
        )
    }


    const title = update ? "Update Room" : "Create a Room";

    return (
        <Fragment>
            <Grid container spacing={3} className="center" align="center">
                <Grid container spacing={5} justify="center">
                    <Grid item xs={3} align="center" justify="center">
                        <Collapse in={errorMsg != '' || successMsg != ''}>
                            {successMsg != '' ? (
                                <Alert severity="success" onClose={() => setSuccessMsg('')}>{successMsg}</Alert>
                            ) : (
                                <Alert severity="error" align="center" onClose={() => setErrorMsg('')}>{errorMsg}</Alert>
                            )}
                        </Collapse>
                    </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">
                                Control of playback state
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={passGuestCanPause.toString()} onChange={_handleGuestCanPauseChange}>
                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
                            <FormControlLabel value="false" control={<Radio color="secondary" />} label="No control" labelPlacement="bottom" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="number" onChange={_handleVotesChange} defaultValue={votesToSkip} inputProps={{ min: 1, style: { textAlign: "center" } }} />
                        <FormHelperText>
                            <div align="center">
                                Votes required to skip song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {
                    update ? _renderUpdateButton() : _renderCreateButtons()
                }
            </Grid>
        </Fragment>
    )
}