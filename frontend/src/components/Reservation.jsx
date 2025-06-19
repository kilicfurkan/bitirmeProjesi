import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Divider, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { AccessTime, People, Event } from '@mui/icons-material';
import { addReservation, findReservation, cancelReservation } from '../services/api';

// Tarih ve saat formatlama fonksiyonları
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
  // Form state
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // Arama inputları
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchError, setSearchError] = useState('');

  // Arama sonucu bulunan rezervasyonlar listesi
  const [foundReservations, setFoundReservations] = useState([]);

  const minDate = new Date().toISOString().split('T')[0];

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

      if (isUpdate) {
        // Güncelleme işlemi backend varsa buraya eklenmeli
        alert('Güncelleme fonksiyonu backend tarafında tanımlanmalı.');
      } else {
        await addReservation(reservationData);
      }

      setOpenConfirmation(true);
    } catch (error) {
      alert('Rezervasyon işlemi başarısız: ' + (error.message || 'Bilinmeyen hata'));
    }
  };

  const handleClose = () => {
    setOpenConfirmation(false);
  };

  const handleSearch = async () => {
    setSearchError('');
    setFoundReservations([]);
    setIsUpdate(false);

    if (!searchName && !searchPhone) {
      setSearchError('Lütfen isim soyisim veya telefon giriniz.');
      return;
    }

    try {
      const response = await findReservation({
        adSoyad: searchName,
        telefonNo: searchPhone
      });

      const rezervasyonlar = response.data?.rezervasyon || [];

      if (rezervasyonlar.length === 0) {
        alert('Rezervasyon bulunamadı.');
        return;
      }

      setFoundReservations(rezervasyonlar);
    } catch (err) {
      setSearchError(`Arama sırasında hata oluştu: ${err.response?.data?.mesaj || err.message}`);
    }
  };

  const handleSelectReservation = (rezervasyon) => {
    setName(rezervasyon.AdSoyad || rezervasyon.adSoyad);
    setPhone(rezervasyon.TelefonNo || rezervasyon.telefonNo);
    setDate(formatDate(rezervasyon.RezervasyonTarihi || rezervasyon.rezervasyonTarihi));
    setStartTime(formatTime(rezervasyon.BaslangicSaati || rezervasyon.baslangicSaati));
    setEndTime(formatTime(rezervasyon.BitisSaati || rezervasyon.bitisSaati));
    setGuests(rezervasyon.KisiSayisi || rezervasyon.kisiSayisi);
    setSpecialRequests(rezervasyon.Notlar || rezervasyon.not || '');
    setIsUpdate(true);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Bu rezervasyonu iptal etmek istediğinize emin misiniz?')) return;

    try {
      const response = await cancelReservation(id);
      if (response.mesaj === 'Rezervasyon başarıyla iptal edildi.') {
        setFoundReservations((prev) =>
          prev.map((res) =>
            (res.RezervasyonId || res.id || res._id) === id ? { ...res, Durum: 'İptal Edildi' } : res
          )
        );
        alert('Rezervasyon iptal edildi.');
      } else {
        throw new Error(response.hata || 'Rezervasyon iptal edilemedi.');
      }
    } catch (error) {
      alert('Rezervasyon iptal edilemedi: ' + (error.message || 'Bilinmeyen hata'));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FBF5E6', pt: 4, pb: 8 }}>
      <Container maxWidth="lg">

        {/* Başlık ve üst banner */}
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
            borderRadius: '4px'
          }}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
          <Typography variant="h1" component="h1" sx={{ position: 'relative', fontSize: '3.5rem', fontWeight: 'bold', letterSpacing: '1px', mb: 2, fontFamily: 'Playfair Display, serif' }}>
            PERA PALACE
          </Typography>
          <Typography variant="h5" sx={{ position: 'relative', fontStyle: 'italic', letterSpacing: '1px', fontFamily: 'Playfair Display, serif' }}>
            1892'den Beri İstanbul'un İncisi
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Rezervasyon Formu */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderLeft: '4px solid #D4AF37', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '4px' }}>
              <Typography variant="h3" component="h2" sx={{ mb: 3, color: '#8B5A2B', fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
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
                      <InputLabel id="start-time-label">Başlangıç Saati</InputLabel>
                      <Select
                        labelId="start-time-label"
                        value={startTime}
                        label="Başlangıç Saati"
                        onChange={(e) => setStartTime(e.target.value)}
                        sx={{ borderRadius: '2px' }}
                      >
                        {availableTimes.map((timeOption) => (<MenuItem key={timeOption} value={timeOption}>{timeOption}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="end-time-label">Bitiş Saati</InputLabel>
                      <Select
                        labelId="end-time-label"
                        value={endTime}
                        label="Bitiş Saati"
                        onChange={(e) => setEndTime(e.target.value)}
                        sx={{ borderRadius: '2px' }}
                      >
                        {availableTimes.filter(t => !startTime || t > startTime).map((timeOption) => (<MenuItem key={timeOption} value={timeOption}>{timeOption}</MenuItem>))}
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
                        {[...Array(12).keys()].map(i => (<MenuItem key={i + 1} value={i + 1}>{i + 1} Kişi</MenuItem>))}
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
                        '&:hover': { bgcolor: '#6F4521' }
                      }}
                      fullWidth
                    >
                      {isUpdate ? 'Rezervasyonu Güncelle' : 'Rezervasyon Yap'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>

            {/* Arama ve bulunan rezervasyonlar */}
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderLeft: '4px solid #8B5A2B', borderRadius: '4px' }}>
              <Typography variant="h5" sx={{ mb: 3, color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
                Rezervasyonlarım
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Telefon Numarası" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleSearch}
                    sx={{ borderColor: '#8B5A2B', color: '#8B5A2B', fontFamily: 'Cormorant Garamond, serif', '&:hover': { borderColor: '#6F4521', color: '#6F4521' } }}
                  >
                    Ara
                  </Button>
                </Grid>
                {searchError && (
                  <Grid item xs={12}>
                    <Typography color="error">{searchError}</Typography>
                  </Grid>
                )}
              </Grid>

              {/* Bulunan rezervasyonlar tablo */}
              {foundReservations.length > 0 ? (
                <TableContainer sx={{ mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Ad Soyad</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Telefon</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Tarih</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Başlangıç</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Bitiş</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Kişi Sayısı</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Not</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Durum</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Eylemler</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foundReservations.map((rez) => {
                        const id = rez.RezervasyonId || rez.id || rez._id;
                        const durumLower = rez.Durum ? rez.Durum.toLowerCase().trim() : 'beklemede';
                        return (
                          <TableRow
                            key={id}
                            onClick={() => handleSelectReservation(rez)}
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}
                          >
                            <TableCell>{id}</TableCell>
                            <TableCell>{rez.AdSoyad || rez.adSoyad || '-'}</TableCell>
                            <TableCell>{rez.TelefonNo || rez.telefonNo || '-'}</TableCell>
                            <TableCell>{formatDate(rez.RezervasyonTarihi || rez.rezervasyonTarihi) || '-'}</TableCell>
                            <TableCell>{formatTime(rez.BaslangicSaati || rez.baslangicSaati) || '-'}</TableCell>
                            <TableCell>{formatTime(rez.BitisSaati || rez.bitisSaati) || '-'}</TableCell>
                            <TableCell>{rez.KisiSayisi || rez.kisiSayisi || '-'}</TableCell>
                            <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                              {rez.Notlar || rez.not || '-'}
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{
                                  color: durumLower === 'aktif' ? 'green' :
                                         durumLower === 'beklemede' ? 'orange' : 'red',
                                  fontWeight: 500,
                                }}
                              >
                                {rez.Durum || 'Beklemede'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {(durumLower === 'beklemede' || durumLower === 'aktif') && (
                                <Button
                                  variant="contained"
                                  sx={{
                                    bgcolor: '#B22222',
                                    color: 'white',
                                    borderRadius: '2px',
                                    textTransform: 'none',
                                    fontFamily: 'Cormorant Garamond, serif',
                                    '&:hover': { bgcolor: '#8B0000' },
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancel(id);
                                  }}
                                >
                                  İptal Et
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography sx={{ mt: 3, fontStyle: 'italic', color: '#666' }}>
                  Arama yapınız veya sonuç yok.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Sağdaki info bölümü */}
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

        {/* Onay Dialog */}
        <Dialog open={openConfirmation} onClose={handleClose}>
          <DialogTitle sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}>
            Rezervasyon Talebiniz Alındı
          </DialogTitle>
          <DialogContent>
            <Typography>
              Sayın {name}, rezervasyon talebiniz başarıyla alınmıştır. Onay için en kısa sürede sizinle iletişime geçilecektir.
            </Typography>
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