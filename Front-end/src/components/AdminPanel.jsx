import React, { useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, Grid, Card, CardContent } from '@mui/material';

const mockReservations = [
  { id: 1, name: 'Ahmet Yılmaz', phone: '+905551234567', email: 'ahmet@example.com', date: '2025-06-20', time: '19:00', guests: 4, specialRequests: 'Pencere kenarı masa' },
  { id: 2, name: 'Ayşe Demir', phone: '+905559876543', email: 'ayse@example.com', date: '2025-06-21', time: '20:00', guests: 2, specialRequests: 'Vejetaryen menü' },
  { id: 3, name: 'Mehmet Kaya', phone: '+905551111222', email: 'mehmet@example.com', date: '2025-06-22', time: '18:30', guests: 6, specialRequests: 'Doğum günü kutlaması' },
];

const mockOccupancy = {
  totalTables: 20,
  occupiedTables: 12,
  totalGuests: 48,
};

const AdminPanel = () => {
  const [reservations, setReservations] = useState(mockReservations);

  const handleDelete = (id) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FBF5E6',
        backgroundImage: 'url("/images/subtle-pattern.png")',
        backgroundRepeat: 'repeat',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            mb: 4,
            color: '#8B5A2B',
            textAlign: 'center',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 500,
          }}
        >
          Admin Paneli
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}
                >
                  Toplam Masalar
                </Typography>
                <Typography variant="h4">{mockOccupancy.totalTables}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}
                >
                  Dolu Masalar
                </Typography>
                <Typography variant="h4">{mockOccupancy.occupiedTables}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: '#8B5A2B', fontFamily: 'Playfair Display, serif' }}
                >
                  Toplam Misafir
                </Typography>
                <Typography variant="h4">{mockOccupancy.totalGuests}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderLeft: '4px solid #D4AF37',
            borderRadius: '4px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: '#8B5A2B',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Rezervasyonlar
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>İsim</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>E-posta</TableCell>
                <TableCell>Tarih</TableCell>
                <TableCell>Saat</TableCell>
                <TableCell>Kişi Sayısı</TableCell>
                <TableCell>Özel İstekler</TableCell>
                <TableCell>İşlem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>{reservation.guests}</TableCell>
                  <TableCell>{reservation.specialRequests || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'error.main',
                        color: 'white',
                        borderRadius: '2px',
                        textTransform: 'none',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontWeight: 600,
                      }}
                      size="small"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPanel;