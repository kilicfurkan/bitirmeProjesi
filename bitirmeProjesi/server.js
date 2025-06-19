require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const rezervasyonRotalari = require('./rotalar/rezervasyonRotalari');
const adminRotalari = require('./rotalar/adminRotalari');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/rezervasyonlar', rezervasyonRotalari);
app.use('/api/admin', adminRotalari);


app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});