import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Box,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Restaurant, AccessTime, Phone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Stil tanımlamaları
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/api/placeholder/1400/900")', // Ana görseli placeholder ile temsil
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.6)',
        zIndex: -1,
    }
}));

const HeroContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: theme.spacing(4),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: theme.spacing(1),
    maxWidth: '800px',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[12],
    },
    backgroundColor: '#f8f5f0',
    border: '1px solid #e0d5c1',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
}));

const AboutSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0),
    backgroundColor: '#f8f5f0',
    backgroundImage: 'url("/api/placeholder/200/200")', // Tarihi dokuyu gösteren arkaplan
    backgroundBlendMode: 'overlay',
    backgroundSize: '200px',
    backgroundRepeat: 'repeat',
}));

const HomePage = () => {
    return (
        <>
           
            {/* Hero Bölümü */}
            <HeroSection>
                <HeroContent>
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 'bold' }}>
                        ERA PALACE
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontStyle: 'italic', mb: 4 }}>
                        Tarihin ve lezzetin buluştuğu eşsiz mekan
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ mr: 2, backgroundColor: '#c9a66b', '&:hover': { backgroundColor: '#b38d50' } }}>
                        REZERVASYON YAP
                    </Button>
                    <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: '#c9a66b', color: '#c9a66b' } }}>
                        MENÜYÜ İNCELE
                    </Button>
                </HeroContent>
            </HeroSection>

            {/* Özellikler Bölümü */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#333', mb: 6 }}>
                    ERA PALACE'A HOŞGELDİNİZ
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/api/placeholder/400/200"
                                alt="Tarihimiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                    Zengin Tarihimiz
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    1890 yılında kurulan Era Palace, asırlık geçmişi ile eşsiz bir atmosfer sunuyor. Tarihi dokusu ve özgün mimarisi ile misafirlerine unutulmaz anlar yaşatıyor.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/api/placeholder/400/200"
                                alt="Lezzetlerimiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                    Eşsiz Lezzetler
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Şeflerimizin özenle hazırladığı geleneksel ve modern tatların birleştiği menümüzde, en seçkin malzemelerle hazırlanan lezzetleri keşfedin.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/api/placeholder/400/200"
                                alt="Atmosferimiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                    Büyüleyici Atmosfer
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tarihin ihtişamını yansıtan dekorasyonumuz ve özel aydınlatmalarımız ile her öğün, bir ziyafete dönüşüyor. Şehrin kalbinde saklı bir mücevher.
                                </Typography>
                            </CardContent>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </Container>

            {/* Hakkımızda Bölümü */}
            <AboutSection>
                <Container>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 6 }}>
                                <img src="/api/placeholder/600/400" alt="Era Palace İç Mekan" style={{ width: '100%', height: 'auto' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#333' }}>
                                Tarihimiz
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Era Palace, 1890 yılında şehrin önde gelen ailelerinden biri tarafından konak olarak inşa edilmiş, daha sonra 1950 yılında restore edilerek restoran olarak hizmet vermeye başlamıştır.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Tarihi dokusunu ve mimari özelliklerini koruyarak, modern dokunuşlarla yenilenen mekanımız, şehrin kültürel mirasının en önemli parçalarından biridir.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Her köşesinde tarihin izlerini taşıyan Era Palace, misafirlerine sadece bir yemek deneyimi değil, aynı zamanda bir zaman yolculuğu sunmaktadır.
                            </Typography>
                            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#c9a66b', '&:hover': { backgroundColor: '#b38d50' } }}>
                                DAHA FAZLA BİLGİ
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </AboutSection>

            {/* İletişim Bilgileri */}
            <Box sx={{ bgcolor: '#2c2c2c', color: 'white', py: 4 }}>
                <Container>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Restaurant sx={{ mr: 1 }} />
                            <Typography variant="body1">Cumhuriyet Caddesi No: 123, İstanbul</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AccessTime sx={{ mr: 1 }} />
                            <Typography variant="body1">Her Gün 12:00 - 00:00</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone sx={{ mr: 1 }} />
                            <Typography variant="body1">+90 212 345 67 89</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 3, textAlign: 'center' }}>
                <Container>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Era Palace. Tüm Hakları Saklıdır.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;