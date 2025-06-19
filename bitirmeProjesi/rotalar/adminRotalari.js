const express = require('express');
const router = express.Router();

const rezervasyonIslemleri = require('../islemler/rezervasyonIslemleri.js');
const adminRotalariIslemleri = require('../islemler/adminIslemleri.js');
const dogrulamaIslemleri = require('../araKatman/kimlikDogrulama.js');

router.post('/adminGiris', adminRotalariIslemleri.giris);

router.get('/rezervasyonlariGetir', dogrulamaIslemleri.kimlikDogrulama, adminRotalariIslemleri.tumRezervasyonlariGoruntule);

router.post('/rezervasyonKabul',dogrulamaIslemleri.kimlikDogrulama, adminRotalariIslemleri.rezervasyonOnayla);

router.post('/rezervasyonIptal',dogrulamaIslemleri.kimlikDogrulama, adminRotalariIslemleri.rezervasyonIptalEt);

module.exports = router;