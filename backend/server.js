require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const kullaniciRotalari = require('./rotalar/kullaniciRotalari');
const rezervasyonRotalari = require('./rotalar/rezervasyonRotalari');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/kullanici', kullaniciRotalari);
app.use('/api/rezervasyon', rezervasyonRotalari);

console.log("Sunucu başlatılıyor...");

app.listen(port, () => {
    console.log(`Sunucu çalışıyor, http://0.0.0.0:${port}`);
  });