import React from 'react';
import {
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

const PRIMARY_COLOR = 'rgba(99,1,0,255)';
const ACCENT_COLOR = 'rgba(202,174,100,255)';

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/background.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
    margin: '0 auto'
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
    border: `1px solid ${ACCENT_COLOR}`,
}));

const AboutSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0),
    backgroundColor: '#f8f5f0',
    backgroundImage: 'url("/images/about-bg.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    position: 'relative',
    overflow: 'hidden'
}));

const HomePage = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
            <HeroSection>
                <HeroContent>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 'bold', color: ACCENT_COLOR }}
                    >
                        PERA PALACE
                    </Typography>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontStyle: 'italic', mb: 4 }}
                    >
                        Tarihin ve lezzetin buluştuğu eşsiz mekan
                    </Typography>
                    <Button
                        component={Link}
                        to="/reservation"
                        variant="contained"
                        size="large"
                        sx={{
                            mr: 2,
                            backgroundColor: ACCENT_COLOR,
                            color: PRIMARY_COLOR,
                            '&:hover': { backgroundColor: '#b38d50' },
                        }}
                    >
                        REZERVASYON YAP
                    </Button>
                    <Button
                        component={Link}
                        to="/menu"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                                borderColor: ACCENT_COLOR,
                                color: ACCENT_COLOR,
                            },
                        }}
                    >
                        MENÜYÜ İNCELE
                    </Button>
                </HeroContent>
            </HeroSection>

            <Container sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ fontFamily: 'Cormorant Garamond, serif', color: PRIMARY_COLOR, mb: 6 }}
                >
                    PERA PALACE'A HOŞGELDİNİZ
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            title: "Zengin Tarihimiz",
                            text: "1890 yılında kurulan Pera Palace, asırlık geçmişi ile eşsiz bir atmosfer sunuyor.",
                            img: "/images/history.jpg",
                        },
                        {
                            title: "Eşsiz Lezzetler",
                            text: "Şeflerimizin özenle hazırladığı geleneksel ve modern tatların birleşimini keşfedin.",
                            img: "/images/flavors.jpg",
                        },
                        {
                            title: "Büyüleyici Atmosfer",
                            text: "Tarihi dekorasyon ve özel ambiyans ile unutulmaz bir deneyim yaşayın.",
                            img: "/images/ambiance.jpg",
                        },
                    ].map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <FeatureCard>
                                <CardMedia component="img" height="200" image={item.img} alt={item.title} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Cormorant Garamond, serif', color: PRIMARY_COLOR }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.text}
                                    </Typography>
                                </CardContent>
                            </FeatureCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <AboutSection>
                <Container>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: 6 }}>
                                <img src="/images/interior.jpg" alt="Pera Palace İç Mekan" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: PRIMARY_COLOR }}>
                                Tarihimiz
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Pera Palace, 1890 yılında konak olarak inşa edilmiş, 1950'de restoran olarak hizmet vermeye başlamıştır.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Modern dokunuşlarla yenilenen mekanımız, şehrin kültürel mirasının en önemli parçalarındandır.
                            </Typography>
                            <Button component={Link} to="/about" variant="contained" sx={{ mt: 2, backgroundColor: ACCENT_COLOR, color: PRIMARY_COLOR, '&:hover': { backgroundColor: '#b38d50' } }}>
                                DAHA FAZLA BİLGİ
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </AboutSection>

            <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: PRIMARY_COLOR, color: 'white', py: 4 }}>
                <Container>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Restaurant sx={{ mr: 1, color: ACCENT_COLOR }} />
                            <Typography variant="body1">Cumhuriyet Caddesi No: 123, İstanbul</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AccessTime sx={{ mr: 1, color: ACCENT_COLOR }} />
                            <Typography variant="body1">Her Gün 12:00 - 00:00</Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone sx={{ mr: 1, color: ACCENT_COLOR }} />
                            <Typography variant="body1">+90 212 345 67 89</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 3, textAlign: 'center' }}>
                <Container>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Pera Palace. Tüm Hakları Saklıdır.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;
