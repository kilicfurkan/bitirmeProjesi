import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: 'rgba(99, 1, 0, 1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  minHeight: '64px !important',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'rgba(202, 174, 100, 1)',
  fontWeight: 600,
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: '1.05rem',
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  '&:hover': {
    color: '#fff8dc',
  },
}));

const Navbar = () => {
  return (
    <AppBar position="static" elevation={3}>
      <StyledToolbar>
        {/* Sol kısım: Logo ve yazı */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img
              src="/images/logo2.jpg"
              alt="Pera Palace Logo"
              style={{ height: 60, marginRight: 12 }}
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 'bold',
              color: 'rgba(202, 174, 100, 1)',
              fontSize: '1.6rem',
              letterSpacing: '1px'
            }}
          >
            PERA PALACE
          </Typography>
        </Box>

        {/* Sağ kısım: Menü butonları */}
        <Box>
          <Link to="/"><StyledButton>Ana Sayfa</StyledButton></Link>
          <Link to="/menu"><StyledButton>Menü</StyledButton></Link>
          <Link to="/reservation"><StyledButton>Rezervasyon</StyledButton></Link>
          <Link to="/about"><StyledButton>Hakkımızda</StyledButton></Link>
          <Link to="/contact"><StyledButton>İletişim</StyledButton></Link>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;