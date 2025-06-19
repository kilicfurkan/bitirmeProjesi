const { poolPromise } = require('../konfigurasyon/veritabani');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { request } = require('express');


exports.giris = async (req, res) => {
    try {
        const { kullaniciAdi, sifre } = req.body;
        if (!kullaniciAdi || !sifre) {
            return res.status(400).json({ hata: 'Lütfen kullanıcı adı ve şifre girin.' });
        }

        const baglanti = await poolPromise;
        const kullanici = await baglanti.request()
            .input('kullaniciAdi', kullaniciAdi)
            .query('SELECT * FROM Kullanici WHERE KullaniciAdi = @kullaniciAdi');

        if (kullanici.recordset.length === 0) {
            return res.status(404).json({ hata: 'Kullanıcı bulunamadı.' });
        }
        const kullaniciVerisi = kullanici.recordset[0];
        const sifreDogru = bcrypt.compareSync(sifre, kullaniciVerisi.Sifre);
        if (!sifreDogru) {
            return res.status(401).json({ hata: 'Geçersiz şifre.' });
        }
        const token = jwt.sign({ kullaniciId: kullaniciVerisi.KullaniciId, rol: kullaniciVerisi.Rol }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ mesaj: 'Giriş başarılı.', token: token, kullaniciId: kullaniciVerisi.KullaniciId, rol: kullaniciVerisi.Rol });
    } catch (error) {
        res.status(500).json({ hata: 'Giriş sırasında bir hata oluştu.' });
        console.error('Giriş hatası:', error);
    }
}

exports.rezervasyonlariGoruntule = async (req, res) => {
    try {
        const { rezervasyonTarihi, baslangicSaati, bitisSaati } = req.query;
        if (!rezervasyonTarihi) {
            return res.status(400).json({ hata: 'Lütfen rezervasyon tarihini girin.' });
        }

        const formatBaslangicSaati = baslangicSaati ? moment(baslangicSaati, 'HH:mm').format('HH:mm') : null;
        const formatBitisSaati = bitisSaati ? moment(bitisSaati, 'HH:mm').format('HH:mm') : null;
        const formatRezervasyonTarihi = moment(rezervasyonTarihi).format('YYYY-MM-DD');

        const baglanti = await poolPromise;

        let sorgu = `
            SELECT * FROM Rezervasyon
            WHERE RezervasyonTarihi = @rezervasyonTarihi
        `;

        const request = baglanti.request().input('rezervasyonTarihi', formatRezervasyonTarihi);

        if (formatBaslangicSaati) {
            sorgu += ` AND BaslangicSaati >= @baslangicSaati`;
            request.input('baslangicSaati', formatBaslangicSaati);
        }

        if (formatBitisSaati) {
            sorgu += ` AND BitisSaati <= @bitisSaati`;
            request.input('bitisSaati', formatBitisSaati);
        }

        sorgu += ` ORDER BY BaslangicSaati ASC;`;

        const rezervasyonlar = await request.query(sorgu);

        if (rezervasyonlar.recordset.length === 0) {
            return res.status(404).json({ mesaj: 'Bu aralıkta rezervasyon bulunmamaktadır.' });
        }

        res.status(200).json(rezervasyonlar.recordset);
    } catch (error) {
        res.status(500).json({ hata: 'Rezervasyonları görüntüleme sırasında bir hata oluştu.' });
        console.error('Rezervasyonları görüntüleme hatası:', error);
    }
}

exports.rezervasyonOnayla = async (req, res) => {
    try {
        const { rezervasyonId } = req.body;
        if (!rezervasyonId) {
            return res.status(400).json({ hata: 'Lütfen onaylanacak rezervasyonun ID\'sini girin.' });
        }

        const baglanti = await poolPromise;

        const rezervasyon = await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .query('SELECT * FROM Rezervasyon WHERE RezervasyonId = @rezervasyonId');

        if (rezervasyon.recordset.length === 0) {
            return res.status(404).json({ hata: 'Rezervasyon bulunamadı.' });
        }

        await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .query('UPDATE Rezervasyon SET Durum = \'Aktif\' WHERE RezervasyonId = @rezervasyonId');

        res.status(200).json({ mesaj: 'Rezervasyon başarıyla onaylandı.' });
    } catch (error) {
        res.status(500).json({ hata: 'Rezervasyonu onaylama sırasında bir hata oluştu.' });
        console.error('Rezervasyonu onaylama hatası:', error);
    }
}

exports.tumRezervasyonlariGoruntule = async (req, res) => {
  try {
    const { date } = req.query;
    const baglanti = await poolPromise;
    let query = 'SELECT * FROM Rezervasyon';
    if (date) {
      query += ' WHERE CAST(RezervasyonTarihi AS DATE) = @date';
    }
    query += ' ORDER BY RezervasyonTarihi DESC, BaslangicSaati ASC';

    const request = baglanti.request();
    if (date) {
      request.input('date', date);
    }

    const rezervasyonlar = await request.query(query);
    if (rezervasyonlar.recordset.length === 0) {
      return res.status(404).json({ mesaj: 'Henüz rezervasyon yapılmamıştır.' });
    }

    res.status(200).json(rezervasyonlar.recordset);
  } catch (error) {
    res.status(500).json({ hata: 'Tüm rezervasyonları görüntüleme sırasında bir hata oluştu.' });
    console.error('Tüm rezervasyonları görüntüleme hatası:', error);
  }
};

exports.rezervasyonIptalEt = async (req, res) => {
    try {
        const { rezervasyonId } = req.body;
        if (!rezervasyonId) {
            return res.status(400).json({ hata: 'Lütfen iptal edilecek rezervasyonun ID\'sini girin.' });
        }

        const baglanti = await poolPromise;

        const rezervasyon = await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .query('SELECT * FROM Rezervasyon WHERE RezervasyonId = @rezervasyonId');

        if (rezervasyon.recordset.length === 0) {
            return res.status(404).json({ hata: 'Rezervasyon bulunamadı.' });
        }

        await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .query('UPDATE Rezervasyon SET Durum = \'İptal Edildi\' WHERE RezervasyonId = @rezervasyonId');

        res.status(200).json({ mesaj: 'Rezervasyon başarıyla iptal edildi.' });
    } catch (error) {
        res.status(500).json({ hata: 'Rezervasyonu iptal etme sırasında bir hata oluştu.' });
        console.error('Rezervasyonu iptal etme hatası:', error);
    }
}