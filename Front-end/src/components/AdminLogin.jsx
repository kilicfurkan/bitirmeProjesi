import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const mockAuth = (username, password) => {
      return username === 'admin' && password === 'pera123';
    };

    if (mockAuth(username, password)) {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        bgcolor: '#FBF5E6',
        backgroundImage: 'url("/images/subtle-pattern.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 0,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            width: '100%',
            borderLeft: '4px solid #D4AF37',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: '4px',
            bgcolor: '#FFFAF0',
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 3,
              color: '#8B5A2B',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 500,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Admin Girişi
          </Typography>
          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': { borderRadius: '2px' },
              }}
              required
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': { borderRadius: '2px' },
              }}
              required
            />
            {error && (
              <Typography sx={{ mb: 2, textAlign: 'center', color: 'error.main' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#8B5A2B',
                color: 'white',
                fontSize: '1.1rem',
                height: '56px',
                borderRadius: '2px',
                textTransform: 'none',
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 600,
                '&:hover': { bgcolor: '#6F4521' },
              }}
              fullWidth
            >
              Giriş Yap
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;