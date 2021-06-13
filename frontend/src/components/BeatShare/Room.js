import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";


export default function Room(props) {
    const history = useHistory();
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [spotifyAuth, setSpotifyAuth] = useState(false);
    const [song, setSong] = useState({});

    let params = useParams();

    const _getRoomDetails = async () => {
        await fetch('/api/get-room' + '?code=' + params.roomCode)
            .then(async (response) => {
                if (!response.ok) {
                    history.push("/");
                }
                return await response.json();
            })
            .then(async (data) => {
                setGuestCanPause(data.guest_can_pause);
                setVotesToSkip(data.votes_to_skip);
                setIsHost(data.is_host)
            }).then(() => {
                if (isHost) {
                    _authenticateSpotify();
                }
            });
    }

    useEffect(() => {
        _getRoomDetails();
        _getCurrentSong();
    }, [params, isHost]);

    useEffect(() => {
        const interval = setInterval(_getCurrentSong, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    const _authenticateSpotify = async () => {
        await fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then(async (data) => {
                setSpotifyAuth(data.status);
                if (!data.status) {
                    await fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        })
                }
            })
    }

    const _leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('/api/leave-room', requestOptions).then((_response) => {
            history.push("/");
        });
    }

    const _updateShowSettings = (value) => {
        setShowSettings(value);
    }

    const _renderSettingsButton = () => {
        return (
            <button className="btn btn-primary text-dark ml-3" onClick={() => _updateShowSettings(true)}>
                Settings
            </button>
        )
    }

    const _renderSettings = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} passVotesToSkip={votesToSkip} passGuestCanPause={guestCanPause} passRoomCode={params.roomCode} updateCallback={_getRoomDetails} updateShowSettingsCallback={_updateShowSettings} />
                </Grid>
            </Grid>
        )
    }

    const _getCurrentSong = () => {
        fetch('/spotify/current-song').then((response) => {
            if (!response.ok) {
                return {};
            } else {
                return response.json();
            }
        }).then((data) => {
            setSong(data);
            // console.log(data);
        })
    }


    if (showSettings) {
        return _renderSettings();
    }
    return (
        <Fragment>
            <Grid container className="center justify-content-center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4" className="beatShare_text room_page_code mb-2">
                        Room Code : {params.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6" className="beatShare_text room_page_votes">
                        Votes : {votesToSkip}
                    </Typography>
                </Grid>
                <MusicPlayer {...song} />

                <Grid item xs={12} align="center">
                    <button className="btn btn-primary text-danger mr-4" onClick={_leaveButtonPressed}>
                        Leave Room
                    </button>
                    {
                        isHost ? _renderSettingsButton() : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    )
}