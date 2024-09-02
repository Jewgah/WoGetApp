import { Link, Typography } from "@mui/material";
import React from 'react';

export default function Footer(props) {
    

    return (
            <Typography variant="h6" color="text.secondary" align="center" marginTop={"30px"} {...props}>
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Naomi | Naths | Jordan
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
    )
}