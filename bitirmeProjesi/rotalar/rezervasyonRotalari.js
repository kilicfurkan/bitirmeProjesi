const express = require('express');
const router = express.Router();

const rezervasyonIslemleri = require('../islemler/rezervasyonIslemleri.js');

router.post('/rezervasyonYap', rezervasyonIslemleri.ekle);
router.get('/rezervasyonSorgula', rezervasyonIslemleri.sorgula);
router.put('/rezervasyonGuncelle', rezervasyonIslemleri.guncelle);
router.delete('/rezervasyonSil', rezervasyonIslemleri.sil);

module.exports = router;