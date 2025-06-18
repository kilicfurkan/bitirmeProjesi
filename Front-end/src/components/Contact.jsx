import React from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocationOn, Email, Phone, AccessTime } from '@mui/icons-material';

// Başlık arkaplan stili
const PageHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/contact-header.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.5)',
        zIndex: -1
    }
}));

const HeaderContent = styled(Box)(({ theme }) => ({
    zIndex: 1,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1)
}));

const ContactPage = () => {
    return (
        <>
            {/* Sayfa başlığı */}
            <PageHeader>
                <HeaderContent>
                    <Typography variant="h3" sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 'bold' }}>
                        BİZE ULAŞIN
                    </Typography>
                    <Typography variant="h4" sx={{ fontStyle: 'italic' }}>
                        Sizi ağırlamaktan onur duyarız.
                    </Typography>
                </HeaderContent>
            </PageHeader>

            {/* Ana içerik */}
            <Box sx={{ backgroundColor: '#f8f5f0', py: 8 }}>
                <Container>
                    <Grid container spacing={6}>
                        <Grid item sx={{ flexBasis: '100%', maxWidth: '100%' }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 4,
                                    bgcolor: '#fffaf0',
                                    borderLeft: '4px solid #D4AF37',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                        color: '#8B5A2B',
                                        mb: 3,
                                    }}
                                >
                                    İletişim Bilgileri
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <LocationOn sx={{ color: '#D4AF37' }} />
                                    <Typography variant="body1">
                                        Meşrutiyet Cad. No:52, Tepebaşı, Beyoğlu, İstanbul
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Phone sx={{ color: '#D4AF37' }} />
                                    <Typography variant="body1">+90 212 345 67 89</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Email sx={{ color: '#D4AF37' }} />
                                    <Typography variant="body1">reservations@perapalace.com</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <AccessTime sx={{ color: '#D4AF37' }} />
                                    <Typography variant="body1">Her gün 12:00 – 00:00</Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Harita */}
                        <Grid item sx={{ flexBasis: '100%', maxWidth: '100%' }}>
                            <Card>
                                <CardMedia
                                    component="iframe"
                                    height="350"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.4941702495863!2d28.976852315416375!3d41.031486579299244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab777777b2e8b%3A0x77dfcb2f60e0e3a7!2sPera%20Palace%20Hotel!5e0!3m2!1str!2str!4v1622547648973!5m2!1str!2str"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Pera Palace Konum"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Pera Palace Hotel konumu – Google Haritalar
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 3, textAlign: 'center' }}>
                <Container>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Pera Palace. Tüm Hakları Saklıdır.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default ContactPage;
