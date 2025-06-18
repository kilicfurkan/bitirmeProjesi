import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Stil tanımlamaları
const AboutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundImage: 'url("/images/history.jpg")', // Tarihi dokuyu çağrıştıran arka plan
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'overlay',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  position: 'relative',
  color: '#333',
}));

const ImageBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[6],
  width: '100%',
  height: 'auto',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const AboutPage = () => {
  return (
    <AboutSection>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Görsel Kısım */}
          <Grid item xs={12} md={6}>
            <ImageBox>
              <img 
                src="/images/interior.jpg" 
                alt="Era Palace İç Mekan" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </ImageBox>
          </Grid>

          {/* Yazı Kısmı */}
          <Grid item xs={12} md={6}>
            <ContentBox>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontFamily: 'Cormorant Garamond, serif', 
                  fontWeight: 'bold', 
                  color: '#5a4633' 
                }}
              >
                Tarihimiz ve Misyonumuz
              </Typography>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, fontFamily: 'Lora, serif' }}>
                Pera Palace, 1890 yılında Osmanlı mimarisinin en güzel örneklerinden biri olarak inşa edilmiş ve 
                asırlık geçmişi boyunca sayısız anıya ev sahipliği yapmıştır. 
                1950'lerde restorasyon geçirerek restoran olarak hizmet vermeye başlayan mekanımız, 
                tarih ve lezzeti kusursuz şekilde bir araya getiriyor.
              </Typography>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Amacımız misafirlerimize sadece bir yemek deneyimi sunmak değil, aynı zamanda zamanda yolculuk yapar 
                gibi o dönemin ruhunu hissettirmektir. Özenle seçilen malzemeler, geleneksel tarifler ve 
                eşsiz atmosferimizle her ziyaretinizde unutulmaz anlar yaşamanızı hedefliyoruz.
              </Typography>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Misafirperverliğimiz ve kalite anlayışımızla Pera Palace, şehrin kültürel mirasının ve gastronomi dünyasının 
                en değerli parçalarından biri olmaya devam etmektedir.
              </Typography>

              <Button 
                variant="contained" 
                sx={{ 
                  mt: 3, 
                  backgroundColor: '#c9a66b', 
                  '&:hover': { backgroundColor: '#b38d50' },
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Daha Fazla Bilgi
              </Button>
            </ContentBox>
          </Grid>
        </Grid>
      </Container>
    </AboutSection>
  );
};

export default AboutPage;