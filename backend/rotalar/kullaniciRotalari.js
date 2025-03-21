const express = require("express");
const router = express.Router();
const kullaniciKontrolu = require("../kontroller/kullaniciKontrolu");
const kimlikDogrulama = require("../araKatman/kimlikDogrulama");

router.post("/kayit", kullaniciKontrolu.kayitOl);
router.post("/giris", kullaniciKontrolu.kullaniciGiris);

router.get("/profil", kimlikDogrulama, kullaniciKontrolu.kullaniciProfilGetir);

router.put("/guncelle", kimlikDogrulama, kullaniciKontrolu.kullaniciGuncelle);

module.exports = router;
