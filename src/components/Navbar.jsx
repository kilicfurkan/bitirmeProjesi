import React from 'react'
import {
    AppBar,
    Typography,
    Button,
    Toolbar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';




export default function Navbar() {

    const StyledToolbar = styled(Toolbar)(({ theme }) => ({
        backgroundColor: 'rgba(207, 161, 7, 0.9)',
    }));

    const navigate = useNavigate();



    return (
        <AppBar position="static">
            <StyledToolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Cormorant Garamond, serif' }}>
                    ERA PALACE
                </Typography>
                <Link to="/">
                    <Button color="inherit">Ana Sayfa</Button>
                </Link>

                
                    <Button  color="inherit">Menü</Button>
                
                <Link to="/reservation">
                    <Button color="inherit">Rezervasyon</Button>
                </Link>

                <Button color="inherit">Hakkımızda</Button>
                <Button color="inherit">İletişim</Button>
            </StyledToolbar>
        </AppBar>
    )
}
