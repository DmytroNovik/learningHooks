import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {TERMS} from '../../constants/routes'
import Button from '@material-ui/core/Button';

export default function About() {
    return (
        <Fragment>
            <p>ABOUT THE WEBSITE</p>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={TERMS(12)}
            >
                LINK
            </Button>
        </Fragment>
    );
}
