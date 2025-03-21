const express = require('express');
const router = express.Router();
const rezervasyonKontrolu = require('../kontroller/rezervasyonKontrolu');
const kimlikDogrulama = require('../araKatman/kimlikDogrulama');

router.post('/rezervasyonEkle', kimlikDogrulama, rezervasyonKontrolu.rezervasyonEkle);

router.get('/rezervasyonlariGetir', kimlikDogrulama, rezervasyonKontrolu.rezervasyonlariGetir);

router.put('/rezervasyonGuncelle', kimlikDogrulama, rezervasyonKontrolu.rezervasyonGuncelle);

router.put('/rezervasyonIptal', kimlikDogrulama, rezervasyonKontrolu.rezervasyonIptal);

module.exports = router;