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
        return "Join page";
    }

    const _createInfo = () => {
        return "Create page";
    }

    return (
        <Grid container spacing={1} className="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    What is Beat Share?
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="body1">
                    {infoPage === pages.JOIN ? _joinInfo() : _createInfo()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <IconButton onClick={() => { infoPage === pages.CREATE ? setInfoPage(pages.JOIN) : setInfoPage(pages.CREATE) }}>
                    {infoPage === pages.CREATE ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
                </IconButton>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}