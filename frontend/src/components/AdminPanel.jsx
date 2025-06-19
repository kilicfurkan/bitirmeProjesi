import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllReservations, acceptReservation, cancelReservation } from '../services/api';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [reservations, setReservations] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to format time (handles multiple formats -> HH:mm)
  const formatTime = (time) => {
    if (!time || typeof time !== 'string') return '-';
    // Handle various formats: YYYY-MM-DD HH:mm:ss, HH:mm:ss, HH:mm, HHmmss, HHmm
    const match = time.match(/(?:\d{4}-\d{2}-\d{2}\s)?(\d{2}:\d{2})(?::\d{2})?|(\d{2})(\d{2})(?:\d{2})?$/);
    if (match) {
      if (match[1]) return match[1]; // HH:mm from YYYY-MM-DD HH:mm:ss or HH:mm:ss or HH:mm
      if (match[2] && match[3]) return `${match[2]}:${match[3]}`; // HHmm(ss) -> HH:mm
    }
    return '-'; // Fallback for invalid formats
  };

  // Function to sort reservations: Beklemede > Aktif > İptal Edildi
  const sortReservations = (reservations) => {
    const statusPriority = {
      beklemede: 1,
      aktif: 2,
      'iptal edildi': 3,
    };
    return [...reservations].sort((a, b) => {
      const aStatus = a.Durum ? a.Durum.toLowerCase().trim() : '';
      const bStatus = b.Durum ? b.Durum.toLowerCase().trim() : '';
      return (statusPriority[aStatus] || 4) - (statusPriority[bStatus] || 4);
    });
  };

  // Fetch reservations on component mount or when dateFilter changes
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setIsAuthenticated(false);
          navigate('/admin-login');
          return;
        }
        const response = await getAllReservations(dateFilter);
        if (Array.isArray(response)) {
          // Log essential fields for debugging
          response.forEach((res, index) => {
            console.log(
              `Reservation ${index + 1} Durum: ${res.Durum}, Not: ${res.Not}, ` +
              `BaslangicSaati: ${res.BaslangicSaati}, BitisSaati: ${res.BitisSaati}`
            );
          });
          setReservations(sortReservations(response)); // Sort reservations
          setError('');
        } else if (response.mesaj === 'Henüz rezervasyon yapılmamıştır.') {
          setReservations([]); // Clear reservations
          setError(dateFilter ? 'Bu tarihte rezervasyon yoktur.' : 'Henüz rezervasyon bulunmamaktadır.');
        } else {
          throw new Error(response.hata || 'Rezervasyonlar yüklenemedi.');
        }
      } catch (err) {
        setError(err.message || 'Sunucu ile bağlantı kurulamadı.');
        if (err.message === 'Yetkilendirme tokenı bulunamadı.' || err.message.includes('401')) {
          setIsAuthenticated(false);
          navigate('/admin-login');
        }
      }
    };
    fetchReservations();
  }, [navigate, setIsAuthenticated, dateFilter]);

  // Handle accept reservation
  const handleAccept = async (rezervasyonId) => {
    try {
      const response = await acceptReservation(rezervasyonId);
      if (response.mesaj === 'Rezervasyon başarıyla onaylandı.') {
        setReservations((prev) => {
          const updated = prev.map((res) =>
            res.RezervasyonId === rezervasyonId ? { ...res, Durum: 'Aktif' } : res
          );
          return sortReservations(updated); // Re-sort after update
        });
        setError('');
      } else {
        throw new Error(response.hata || 'Rezervasyon kabul edilemedi.');
      }
    } catch (err) {
      setError(err.message || 'Rezervasyon kabul edilirken hata oluştu.');
    }
  };

  // Handle cancel reservation
  const handleCancel = async (rezervasyonId) => {
    try {
      const response = await cancelReservation(rezervasyonId);
      if (response.mesaj === 'Rezervasyon başarıyla iptal edildi.') {
        if (dateFilter) {
          // If date filter is active, remove canceled reservation
          setReservations((prev) =>
            sortReservations(prev.filter((res) => res.RezervasyonId !== rezervasyonId))
          );
        } else {
          setReservations((prev) => {
            const updated = prev.map((res) =>
              res.RezervasyonId === rezervasyonId ? { ...res, Durum: 'İptal Edildi' } : res
            );
            return sortReservations(updated); // Re-sort after update
          });
        }
        setError('');
      } else {
        throw new Error(response.hata || 'Rezervasyon iptal edilemedi.');
      }
    } catch (err) {
      setError(err.message || 'Rezervasyon iptal edilirken hata oluştu.');
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
        py: 4,
      }}
    >
      <Container maxWidth="xl">
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
              mb: 4,
              color: '#8B5A2B',
              textAlign: 'center',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 500,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Rezervasyon Yönetimi
          </Typography>
          <TextField
            fullWidth
            label="Tarihe Göre Filtrele"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': { borderRadius: '2px' },
            }}
            InputLabelProps={{ shrink: true }}
          />
          {error && (
            <Typography sx={{ mb: 2, textAlign: 'center', color: 'error.main' }}>
              {error}
            </Typography>
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Ad Soyad</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Tarih</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Başlangıç</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Bitiş</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Kişi Sayısı</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Telefon</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Not</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#8B5A2B' }}>Eylemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation) => {
                  const durumLower = reservation.Durum ? reservation.Durum.toLowerCase().trim() : '';
                  console.log(
                    `Reservation ${reservation.RezervasyonId} Durum: ${reservation.Durum}, Not: ${reservation.Not}, ` +
                    `BaslangicSaati: ${reservation.BaslangicSaati}, BitisSaati: ${reservation.BitisSaati}`
                  ); // Debug: Essential fields
                  return (
                    <TableRow key={reservation.RezervasyonId}>
                      <TableCell>{reservation.RezervasyonId}</TableCell>
                      <TableCell>{reservation.AdSoyad || '-'}</TableCell>
                      <TableCell>{new Date(reservation.RezervasyonTarihi).toLocaleDateString('tr-TR')}</TableCell>
                      <TableCell>{formatTime(reservation.BaslangicSaati)}</TableCell>
                      <TableCell>{formatTime(reservation.BitisSaati)}</TableCell>
                      <TableCell>{reservation.KisiSayisi || '-'}</TableCell>
                      <TableCell>{reservation.TelefonNo || '-'}</TableCell>
                      <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {reservation.Notlar || '-'}
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: durumLower === 'aktif' ? 'green' : 
                                   durumLower === 'beklemede' ? 'orange' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {reservation.Durum || 'Bilinmiyor'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {durumLower === 'beklemede' && (
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: '#8B5A2B',
                              color: 'white',
                              mr: 1,
                              borderRadius: '2px',
                              textTransform: 'none',
                              fontFamily: 'Cormorant Garamond, serif',
                              '&:hover': { bgcolor: '#6F4521' },
                            }}
                            onClick={() => handleAccept(reservation.RezervasyonId)}
                          >
                            Kabul Et
                          </Button>
                        )}
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
                            onClick={() => handleCancel(reservation.RezervasyonId)}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;