import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider,
  ThemeProvider,
  createTheme,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { AccessTime, People, Event, RestaurantMenu } from '@mui/icons-material';

// Özel tema oluşturma - Pera Palace'ın tarihi dokusunu yansıtan renkler
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5A2B', // Kahverengi-altın tonu
    },
    secondary: {
      main: '#D4AF37', // Altın rengi
    },
    background: {
      default: '#FBF5E6', // Krem rengi arka plan
      paper: '#FFFAF0',   // Açık krem kağıt rengi
    },
  },
  typography: {
    fontFamily: 'Cormorant Garamond, Playfair Display, serif',
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
    },
    button: {
      fontFamily: 'Cormorant Garamond, serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2px',
          textTransform: 'none',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '2px',
          },
        },
      },
    },
  },
});

const Reservation = () => {
  // Tarih ve saat için basit string state'leri kullanacağız
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

  // Kullanılabilir tarihler için
  const today = new Date();
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  const minDate = formatDate(today);

  // Kullanılabilir saatler
  const availableTimes = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        backgroundImage: 'url("/images/subtle-pattern.png")', 
        backgroundRepeat: 'repeat',
        pt: 4, 
        pb: 8 
      }}>
        <Container maxWidth="lg">
          {/* Üst Banner */}
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
              }}
            >
              PERA PALACE
            </Typography>
            
            <Typography 
              variant="h5"
              sx={{ 
                position: 'relative',
                fontStyle: 'italic',
                letterSpacing: '1px'
              }}
            >
              1892'den Beri İstanbul'un İncisi
            </Typography>
          </Paper>

          <Grid container spacing={4}>
            {/* Rezervasyon Formu */}
            <Grid item xs={12} md={7}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderLeft: '4px solid', 
                  borderColor: 'secondary.main',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <Typography variant="h3" component="h2" sx={{ mb: 3, color: 'primary.main' }}>
                  Rezervasyon
                </Typography>
                
                <Divider sx={{ mb: 3, bgcolor: 'secondary.light' }} />
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tarih Seçiniz"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: minDate
                        }}
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
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Telefon"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        fullWidth
                        sx={{ 
                          mt: 2, 
                          fontSize: '1.1rem',
                          height: '56px'
                        }}
                      >
                        Rezervasyon Yap
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            
            {/* Bilgi ve Görseller */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'rgba(139, 90, 43, 0.2)'
                  }}
                >
                  <Typography variant="h4" component="h3" sx={{ mb: 2, color: 'primary.main' }}>
                    Saatlerimiz
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                    <AccessTime color="secondary" />
                    <Typography variant="body1">
                      <strong>Öğle:</strong> 12:00 - 15:00
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AccessTime color="secondary" />
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
                    <Typography variant="h5" component="h3" gutterBottom color="primary.main">
                      Tarihi Atmosfer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pera Palace'ın eşsiz atmosferinde, Osmanlı'dan Cumhuriyet'e uzanan tarihin izlerini taşıyan ortamda enfes lezzetlerin keyfini çıkarın. 1892'den beri İstanbul'un seçkin misafirlerini ağırlayan mekanımızda tarihi bir yolculuğa çıkın.
                    </Typography>
                  </CardContent>
                </Card>
                
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper',
                    borderLeft: '4px solid',
                    borderColor: 'secondary.main'
                  }}
                >
                  <Typography variant="h5" component="h3" sx={{ mb: 2, color: 'primary.main' }}>
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
        </Container>
        
        {/* Rezervasyon Onay Dialog */}
        <Dialog open={openConfirmation} onClose={handleClose}>
          <DialogTitle sx={{ color: 'primary.main', fontFamily: 'Playfair Display' }}>
            Rezervasyon Talebiniz Alındı
          </DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Sayın {name}, rezervasyon talebiniz başarıyla alınmıştır. Rezervasyon detaylarınızı {email} adresine gönderdik. Onay için en kısa sürede sizinle iletişime geçeceğiz.
            </DialogContentText>
            
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(139, 90, 43, 0.1)', borderRadius: '4px' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event sx={{ mr: 1, fontSize: '1rem', color: 'primary.main' }} />
                <strong>Tarih:</strong> {date}
              </Typography>
              
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime sx={{ mr: 1, fontSize: '1rem', color: 'primary.main' }} />
                <strong>Saat:</strong> {time}
              </Typography>
              
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ mr: 1, fontSize: '1rem', color: 'primary.main' }} />
                <strong>Kişi Sayısı:</strong> {guests}
              </Typography>
            </Box>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">Kapat</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Reservation;