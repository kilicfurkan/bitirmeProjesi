import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Divider, Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { AccessTime, People, Event } from '@mui/icons-material';

const Reservation = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmation(true);
  };
  
  const handleClose = () => {
    setOpenConfirmation(false);
  };

  const today = new Date();
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  const minDate = formatDate(today);

  const availableTimes = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#FBF5E6',
      backgroundImage: 'url("/images/subtle-pattern.png")', 
      backgroundRepeat: 'repeat',
      pt: 4, 
      pb: 8 
    }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            backgroundImage: 'url("/images/pera-palace-header.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            borderRadius: '4px',
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            bgcolor: 'rgba(0,0,0,0.4)' 
          }} />
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              position: 'relative', 
              fontSize: '3.5rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              mb: 2,
              fontFamily: 'Playfair Display, serif',
            }}
          >
            PERA PALACE
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              position: 'relative',
              fontStyle: 'italic',
              letterSpacing: '1px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            1892'den Beri İstanbul'un İncisi
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderLeft: '4px solid #D4AF37',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: '4px',
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 3,
                  color: '#8B5A2B',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 500,
                }}
              >
                Rezervasyon
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: '#D4AF37' }} />
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tarih Seçiniz"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: minDate }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="time-select-label">Saat Seçiniz</InputLabel>
                      <Select
                        labelId="time-select-label"
                        value={time}
                        label="Saat Seçiniz"
                        onChange={(e) => setTime(e.target.value)}
                        sx={{ borderRadius: '2px' }}
                      >
                        {availableTimes.map((timeOption) => (
                          <MenuItem key={timeOption} value={timeOption}>
                            {timeOption}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="guests-label">Misafir Sayısı</InputLabel>
                      <Select
                        labelId="guests-label"
                        value={guests}
                        label="Misafir Sayısı"
                        onChange={(e) => setGuests(e.target.value)}
                        sx={{ borderRadius: '2px' }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <MenuItem key={num} value={num}>{num} Kişi</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="İsim Soyisim"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Telefon"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="E-posta"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Özel İstekler"
                      multiline
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      sx={{
                        bgcolor: '#8B5A2B',
                        color: 'white',
                        mt: 2,
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
                      Rezervasyon Yap
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3, 
                  bgcolor: '#FFFAF0',
                  border: '1px solid rgba(139, 90, 43, 0.2)',
                  borderRadius: '4px',
                }}
              >
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    mb: 2,
                    color: '#8B5A2B',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  Saatlerimiz
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ color: '#D4AF37' }} />
                  <Typography variant="body1">
                    <strong>Öğle:</strong> 12:00 - 15:00
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <AccessTime sx={{ color: '#D4AF37' }} />
                  <Typography variant="body1">
                    <strong>Akşam:</strong> 18:00 - 23:00
                  </Typography>
                </Box>
              </Paper>
              <Card elevation={2}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/pera-palace-interior.jpg"
                  alt="Pera Palace Restaurant Interior"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}
                  >
                    Tarihi Atmosfer
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Pera Palace'ın eşsiz atmosferinde, Osmanlı'dan Cumhuriyet'e uzanan tarihin izlerini taşıyan ortamda enfes lezzetlerin keyfini çıkarın. 1892'den beri İstanbul'un seçkin misafirlerini ağırlayan mekanımızda tarihi bir yolculuğa çıkın.
                  </Typography>
                </CardContent>
              </Card>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 3, 
                  bgcolor: '#FFFAF0',
                  borderLeft: '4px solid #D4AF37',
                  borderRadius: '4px',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: 2,
                    color: '#8B5A2B',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  İletişim
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Adres:</strong> Meşrutiyet Cad. No:52, Tepebaşı, Beyoğlu, İstanbul
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Telefon:</strong> +90 212 XXX XX XX
                </Typography>
                <Typography variant="body1">
                  <strong>E-posta:</strong> reservations@perapalace.com
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={openConfirmation} onClose={handleClose}>
          <DialogTitle sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
            Rezervasyon Talebiniz Alındı
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sayın {name}, rezervasyon talebiniz başarıyla alınmıştır. Rezervasyon detaylarınızı {email} adresine gönderdik. Onay için en kısa sürede sizinle iletişime geçeceğiz.
            </DialogContentText>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(139, 90, 43, 0.1)', borderRadius: '4px' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Tarih:</strong> {date}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Saat:</strong> {time}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Kişi Sayısı:</strong> {guests}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{
                color: '#8B5A2B',
                fontFamily: 'Cormorant Garamond, serif',
                textTransform: 'none',
              }}
            >
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Reservation;