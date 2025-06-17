import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: 'rgba(207, 161, 7, 0.9)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
}));

const Navbar = () => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img
              src="/images/logo2.jpg"
              alt="Pera Palace Logo"
              style={{ height: 50, marginRight: 10 }}
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            PERA PALACE
          </Typography>
        </Box>
        <Box>
          <Link to="/">
            <Button color="inherit">Ana Sayfa</Button>
          </Link>
          <Link to="/menu">
            <Button color="inherit">Menü</Button>
          </Link>
          <Link to="/reservation">
            <Button color="inherit">Rezervasyon</Button>
          </Link>
          <Link to="/about">
            <Button color="inherit">Hakkımızda</Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit">İletişim</Button>
          </Link>
          <Link to="/admin/login">
            <Button color="inherit">Admin</Button>
          </Link>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;