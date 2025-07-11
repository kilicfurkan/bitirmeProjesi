import React, { useState } from 'react';
import { 
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  List,
  ListItem
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Tema renkleri
const altin = 'rgba(202,174,100,1)';
const bordo = 'rgba(99,1,0,1)';

// Stil tanımlamaları
const PageHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '40vh',
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
    backgroundImage: 'url("/images/menu-bg.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.45)',
    zIndex: -1,
  }
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  borderRadius: theme.spacing(1),
  maxWidth: '800px',
}));

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-indicator': {
    backgroundColor: altin,
  },
}));

const StyledTab = styled(Tab)(() => ({
  color: bordo,
  fontWeight: '600',
  '&.Mui-selected': {
    color: altin,
    fontWeight: 'bold',
  },
}));

const MenuCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: '#f8f5f0',
  border: `1px solid ${bordo}33`,
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 8px 16px ${bordo}99`,
  },
}));

const DishItem = styled(ListItem)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 0',
  borderBottom: `1px dotted ${bordo}66`,
}));

const MenuContentContainer = styled(Box)(() => ({
  padding: '48px 0',
  backgroundColor: '#f8f5f0',
  backgroundImage: 'url("/images/menu-bg.jpeg")',
  backgroundRepeat: 'repeat',
  backgroundSize: '180px',
  backgroundBlendMode: 'overlay',
}));

const Menu = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const menuCategories = [
    {
      name: "BAŞLANGIÇLAR",
      items: [
        { name: "Osmanlı Saray Çorbası", description: "Geleneksel tarif ile hazırlanan kuzu etli çorba", price: "85 ₺" },
        { name: "Zeytinyağlı Yaprak Sarma", description: "Taze asma yaprağında sarılmış özel harç", price: "95 ₺" },
        { name: "Antep Fıstıklı Humus", description: "Ev yapımı humus, Antep fıstığı ve zeytinyağı ile", price: "75 ₺" },
        { name: "Muhammara", description: "Közlenmiş kırmızı biber, ceviz ve baharatlar ile", price: "70 ₺" },
        { name: "Şakşuka", description: "Kızartılmış patlıcan, biber ve domates sosu", price: "80 ₺" },
      ]
    },
    {
      name: "ANA YEMEKLER",
      items: [
        { name: "Era Palace Kuzu Tandır", description: "Özel baharat harmanı ile 8 saat fırınlanmış kuzu eti", price: "240 ₺" },
        { name: "Saray Usulü Hünkar Beğendi", description: "Közlenmiş patlıcan beğendi üzerinde dana yahni", price: "220 ₺" },
        { name: "Kekikli Kuzu Pirzola", description: "Özel marine edilmiş kuzu pirzola, mevsim sebzeleri ile", price: "280 ₺" },
        { name: "Ottoman Izgara Köfte", description: "Geleneksel tarifle hazırlanan köfte, pilav ve mevsim yeşillikleri ile", price: "190 ₺" },
        { name: "Saray Kebabı", description: "Özel baharat harmanı ile marine edilmiş kuzu ve dana eti karışımı", price: "210 ₺" },
        { name: "Domatesli Levrek Buğulama", description: "Taze levrek fileto, domates ve otlar ile", price: "230 ₺" },
      ]
    },
    {
      name: "TATLILAR",
      items: [
        { name: "Geleneksel Baklava", description: "Antep fıstığı ile katmer katmer hazırlanan özel baklava", price: "120 ₺" },
        { name: "Kaymaklı Ekmek Kadayıfı", description: "Geleneksel tarifle hazırlanan, özel kaymak ile servis", price: "95 ₺" },
        { name: "Fırın Sütlaç", description: "Odun ateşinde pişirilen geleneksel sütlaç", price: "85 ₺" },
        { name: "Aşure", description: "Saraydan gelen tarifle hazırlanan geleneksel aşure", price: "80 ₺" },
        { name: "Revani", description: "Portakal şerbetli özel revani tatlısı", price: "90 ₺" },
      ]
    },
    {
      name: "İÇECEKLER",
      items: [
        { name: "Türk Kahvesi", description: "Geleneksel yöntemle pişirilen Türk kahvesi", price: "45 ₺" },
        { name: "Çay", description: "Seçkin Rize çayı", price: "25 ₺" },
        { name: "Ayran", description: "Ev yapımı ayran", price: "30 ₺" },
        { name: "Şerbet", description: "Günün özel şerbeti", price: "40 ₺" },
        { name: "Özel Meyve Suları", description: "Mevsim meyvelerinden hazırlanan taze sıkılmış meyve suları", price: "55 ₺" },
        { name: "Limonata", description: "Ev yapımı nane ve zencefilli limonata", price: "50 ₺" },
        { name: "Şarap", description: "Seçkin yerli ve yabancı şaraplar (kadeh)", price: "120 ₺" },
      ]
    }
  ];

  const specialMenus = [
    {
      title: "SARAY ZİYAFETİ",
      description: "İki kişilik özel menü",
      price: "650 ₺",
      items: "Osmanlı Saray Çorbası, Zeytinyağlı Yaprak Sarma, Era Palace Kuzu Tandır, Baklava, Türk Kahvesi",
      image: "/images/special-menu1.jpg"
    },
    {
      title: "TARİHİ LEZZETLER",
      description: "İki kişilik özel menü",
      price: "580 ₺",
      items: "Muhammara, Antep Fıstıklı Humus, Hünkar Beğendi, Kaymaklı Ekmek Kadayıfı, Türk Kahvesi",
      image: "/images/special-menu2.jpg"
    },
    {
      title: "DENİZ TADI",
      description: "İki kişilik özel menü",
      price: "620 ₺",
      items: "Karides Kokteyl, Mevsim Salata, Domatesli Levrek Buğulama, Fırın Sütlaç, Şerbet",
      image: "/images/special-menu3.jpg"
    },
  ];

  return (
    <>
      {/* Sayfa Başlığı */}
      <PageHeader>
        <HeaderContent>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: '#c9a66b', fontWeight: 'bold' }}>
            MENÜMÜZ
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontStyle: 'italic' }}>
            Tarihi ve lezzeti buluşturan özel tatlar
          </Typography>
        </HeaderContent>
      </PageHeader>

      {/* Menü İçeriği */}
      <MenuContentContainer>
        <Container>
          {/* Özel Menüler */}
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: bordo, mb: 1 }}>
            ÖZEL PERA PALACE MENÜLERİ
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ mb: 6, color: bordo }}>
            Özenle seçilmiş, şeflerimizin özel olarak hazırladığı menüler
          </Typography>

          <Grid item xs={12} sx={{ width: '100%' }} spacing={4}>
            {specialMenus.map((menu, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MenuCard>
                  <CardMedia
                    component="img"
                    height="1000"
                    image={menu.image}
                    alt={menu.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Cormorant Garamond, serif', color: altin }}>
                      {menu.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {menu.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic', color: bordo }}>
                      İçindekiler:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {menu.items}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: altin }}>
                      {menu.price}
                    </Typography>
                  </CardContent>
                </MenuCard>
              </Grid>
            ))}
          </Grid>

          {/* Kategori Tabları */}
          <Box sx={{ borderBottom: 1, borderColor: bordo, mb: 4 }}>
            <StyledTabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              centered
            >
              {menuCategories.map((category, index) => (
                <StyledTab label={category.name} key={index} />
              ))}
            </StyledTabs>
          </Box>

          {/* Menü İçeriği */}
          <Box sx={{ py: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontFamily: 'Cormorant Garamond, serif', color: bordo, mb: 5 }}>
              {menuCategories[selectedTab].name}
            </Typography>

            <List>
              {menuCategories[selectedTab].items.map((item, index) => (
                <DishItem key={index}>
                  <Box>
                    <Typography variant="h6" sx={{ fontFamily: 'Cormorant Garamond, serif', color: bordo }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: altin, fontWeight: 'bold', ml: 2 }}>
                    {item.price}
                  </Typography>
                </DishItem>
              ))}
            </List>
          </Box>

          {/* Not */}
          <Box sx={{ mt: 6, p: 3, border: `1px solid ${bordo}33`, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.85)', color: bordo }}>
            <Typography variant="body2" align="center">
              Tüm yemeklerimiz günlük taze malzemeler ile hazırlanmaktadır. Fiyatlarımıza KDV dahildir.
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Özel diyet gereksinimleri ve alerjiler için lütfen servis personelimize danışınız.
            </Typography>
          </Box>
        </Container>
      </MenuContentContainer>

      {/* Footer */}
      <Box sx={{ bgcolor: bordo, color: 'white', py: 3, textAlign: 'center' }}>
        <Container>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Pera Palace. Tüm Hakları Saklıdır.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Menu;
