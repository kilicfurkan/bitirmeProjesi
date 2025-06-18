import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Divider, Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { AccessTime, People, Event } from '@mui/icons-material';
import { addReservation } from '../services/api';
import { findReservation } from '../services/api';


const formatTime = (isoString) => {
  if (!isoString) return '';
  const dateObj = new Date(isoString);
  const hours = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};


const formatDate = (isoString) => {
  if (!isoString) return '';
  const dateObj = new Date(isoString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Reservation = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const minDate = new Date().toISOString().split('T')[0];
  
const formatDate = (input) => {
  if (!input) return '';
  const dateObj = (input instanceof Date) ? input : new Date(input);
  if (isNaN(dateObj)) return '';
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  const availableTimes = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !startTime || !endTime || !guests || !name || !phone) {
      alert('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }

    if (startTime >= endTime) {
      alert('Bitiş saati, başlangıç saatinden sonra olmalıdır.');
      return;
    }

    try {
      const reservationData = {
        rezervasyonTarihi: date,
        baslangicSaati: startTime,
        bitisSaati: endTime,
        kisiSayisi: Number(guests),
        adSoyad: name,
        telefonNo: phone,
        not: specialRequests || ''
      };

      await addReservation(reservationData);
      setOpenConfirmation(true);
    } catch (error) {
      alert('Rezervasyon oluşturulamadı: ' + (error.message || 'Bilinmeyen hata'));
    }
  };

  const handleClose = () => {
    setOpenConfirmation(false);
  };

const handleSearch = async () => {
  try {
    const response = await findReservation({
      adSoyad: searchName,
      telefonNo: searchPhone
    });

    const rezervasyon = response.data?.rezervasyon?.[0];
    console.log(response.data);

    if (rezervasyon) {
      setName(rezervasyon.AdSoyad);
      setPhone(rezervasyon.TelefonNo);
      setDate(formatDate(rezervasyon.RezervasyonTarihi));
      setStartTime(formatTime(rezervasyon.BaslangicSaati));
      setEndTime(formatTime(rezervasyon.BitisSaati));
      setGuests(rezervasyon.KisiSayisi);
      setSpecialRequests(rezervasyon.Notlar || '');
      setIsUpdate(true);
      alert('Rezervasyon bulundu ve forma yüklendi.');
    } else {
      alert('Rezervasyon bulunamadı.');
    }
  } catch (err) {
    alert(`Arama sırasında hata oluştu: ${err.response?.data?.mesaj || err.response?.data?.hata || err.message}`);
  }
};


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FBF5E6', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundImage: 'url("/images/pera-palace-header.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', textAlign: 'center', position: 'relative', borderRadius: '4px' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
          <Typography variant="h1" component="h1" sx={{ position: 'relative', fontSize: '3.5rem', fontWeight: 'bold', letterSpacing: '1px', mb: 2, fontFamily: 'Playfair Display, serif' }}>
            PERA PALACE
          </Typography>
          <Typography variant="h5" sx={{ position: 'relative', fontStyle: 'italic', letterSpacing: '1px', fontFamily: 'Playfair Display, serif' }}>
            1892'den Beri İstanbul'un İncisi
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderLeft: '4px solid #D4AF37', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '4px' }}>
              <Typography variant="h3" component="h2" sx={{ mb: 3, color: '#8B5A2B', fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                Rezervasyon
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: '#D4AF37' }} />
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Tarih Seçiniz" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} inputProps={{ min: minDate }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="start-time-label">Başlangıç Saati</InputLabel>
                      <Select labelId="start-time-label" value={startTime} label="Başlangıç Saati" onChange={(e) => setStartTime(e.target.value)} sx={{ borderRadius: '2px' }}>
                        {availableTimes.map((timeOption) => (<MenuItem key={timeOption} value={timeOption}>{timeOption}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="end-time-label">Bitiş Saati</InputLabel>
                      <Select labelId="end-time-label" value={endTime} label="Bitiş Saati" onChange={(e) => setEndTime(e.target.value)} sx={{ borderRadius: '2px' }}>
                        {availableTimes.filter(t => !startTime || t > startTime).map((timeOption) => (<MenuItem key={timeOption} value={timeOption}>{timeOption}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="guests-label">Misafir Sayısı</InputLabel>
                      <Select labelId="guests-label" value={guests} label="Misafir Sayısı" onChange={(e) => setGuests(e.target.value)} sx={{ borderRadius: '2px' }}>
                        {[...Array(12).keys()].map(i => (<MenuItem key={i + 1} value={i + 1}>{i + 1} Kişi</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="İsim Soyisim" value={name} onChange={(e) => setName(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }} required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Özel İstekler" multiline rows={4} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '2px' } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" sx={{ bgcolor: '#8B5A2B', color: 'white', mt: 2, fontSize: '1.1rem', height: '56px', borderRadius: '2px', textTransform: 'none', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, '&:hover': { bgcolor: '#6F4521' } }} fullWidth>
                      {isUpdate ? 'Rezervasyonu Güncelle' : 'Rezervasyon Yap'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderLeft: '4px solid #8B5A2B', borderRadius: '4px' }}>
              <Typography variant="h5" sx={{ mb: 3, color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
                Rezervasyonlarım
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="İsim Soyisim" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Telefon Numarası" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" fullWidth onClick={handleSearch} sx={{ borderColor: '#8B5A2B', color: '#8B5A2B', fontFamily: 'Cormorant Garamond, serif', '&:hover': { borderColor: '#6F4521', color: '#6F4521' } }}>
                    Ara
                  </Button>
                </Grid>
                {searchError && (
                  <Grid item xs={12}>
                    <Typography color="error">{searchError}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item sx={{ flexBasis: '100%', maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#FFFAF0', border: '1px solid rgba(139, 90, 43, 0.2)', borderRadius: '4px' }}>
                <Typography variant="h4" component="h3" sx={{ mb: 2, color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
                  Saatlerimiz
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ color: '#D4AF37' }} />
                  <Typography variant="body1"><strong>Öğle:</strong> 12:00 - 15:00</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <AccessTime sx={{ color: '#D4AF37' }} />
                  <Typography variant="body1"><strong>Akşam:</strong> 18:00 - 23:00</Typography>
                </Box>
              </Paper>
              <Card elevation={2}>
                <CardMedia component="img" height="200" image="/images/history.jpg" alt="Pera Palace Restaurant Interior" />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
                    Tarihi Atmosfer
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Pera Palace'ın eşsiz atmosferinde, Osmanlı'dan Cumhuriyet'e uzanan tarihin izlerini taşıyan ortamda enfes lezzetlerin keyfini çıkarın.
                  </Typography>
                </CardContent>
              </Card>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#FFFAF0', borderLeft: '4px solid #D4AF37', borderRadius: '4px' }}>
                <Typography variant="h5" component="h3" sx={{ mb: 2, color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
                  İletişim
                </Typography>
                <Typography variant="body1" paragraph><strong>Adres:</strong> Meşrutiyet Cad. No:52, Tepebaşı, Beyoğlu, İstanbul</Typography>
                <Typography variant="body1" paragraph><strong>Telefon:</strong> +90 212 XXX XX XX</Typography>
                <Typography variant="body1"><strong>E-posta:</strong> reservations@perapalace.com</Typography>
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
              Sayın {name}, rezervasyon talebiniz başarıyla alınmıştır. Onay için en kısa sürede sizinle iletişime geçeceğiz.
            </DialogContentText>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(139, 90, 43, 0.1)', borderRadius: '4px' }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Event sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Tarih:</strong> {date}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTime sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Başlangıç Saati:</strong> {startTime}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Bitiş Saati:</strong> {endTime}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <People sx={{ mr: 1, fontSize: '1rem', color: '#8B5A2B' }} />
                <strong>Kişi Sayısı:</strong> {guests}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#8B5A2B', fontFamily: 'Cormorant Garamond, serif', textTransform: 'none' }}>
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Reservation;
