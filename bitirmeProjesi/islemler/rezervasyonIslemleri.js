const { poolPromise } = require("../konfigurasyon/veritabani");
const moment = require('moment');

exports.ekle = async (req, res) => {
    try {
        const { rezervasyonTarihi, baslangicSaati, bitisSaati, kisiSayisi, adSoyad, telefonNo, not } = req.body;

        if (!rezervasyonTarihi || !baslangicSaati || !bitisSaati || !kisiSayisi || !adSoyad || !telefonNo) {
            return res.status(400).json({ hata: 'Lütfen gerekli tüm alanları doldurun.' });
        }
        if (isNaN(kisiSayisi) || kisiSayisi <= 0) {
            return res.status(400).json({ hata: 'Kişi sayısı geçerli bir sayı olmalıdır.' });
        }
        if (!moment(rezervasyonTarihi, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ hata: 'Rezervasyon tarihi geçerli bir tarih formatında olmalıdır (YYYY-MM-DD).' });
        }
        if (!moment(baslangicSaati, 'HH:mm', true).isValid() || !moment(bitisSaati, 'HH:mm', true).isValid()) {
            return res.status(400).json({ hata: 'Başlangıç ve bitiş saatleri geçerli bir saat formatında olmalıdır (HH:mm).' });
        }
        if (!/^\d{10}$/.test(telefonNo)) {
            return res.status(400).json({ hata: 'Telefon numarası 10 haneli bir sayı olmalıdır.' });
        }
        if (not && not.length > 500) {
            return res.status(400).json({ hata: 'Not 500 karakterden fazla olamaz.' });
        }

        const formatadSoyad = adSoyad.trim().toLowerCase();
        const formatRezervasyonTarihi = moment(rezervasyonTarihi).format('YYYY-MM-DD');
        const formatBaslangicSaati = moment(baslangicSaati, 'HH:mm').format('HH:mm');
        const formatBitisSaati = moment(bitisSaati, 'HH:mm').format('HH:mm');

        const baglanti = await poolPromise;

        await baglanti.request()
            .input('rezervasyonTarihi', formatRezervasyonTarihi)
            .input('baslangicSaati', formatBaslangicSaati)
            .input('bitisSaati', formatBitisSaati)
            .input('kisiSayisi', kisiSayisi)
            .input('adSoyad', formatadSoyad)
            .input('telefonNo', telefonNo)
            .input('not', not)
            .query(`
                INSERT INTO Rezervasyon (RezervasyonTarihi, BaslangicSaati, BitisSaati, KisiSayisi, AdSoyad, TelefonNo, Notlar, Durum)
                VALUES (@rezervasyonTarihi, @baslangicSaati, @bitisSaati, @kisiSayisi, @adSoyad, @telefonNo, @not, 'beklemede');
            `);

        return res.status(201).json({ mesaj: 'Rezervasyon başarıyla eklendi.' });
    }
    catch (error) {
        console.error('Rezervasyon ekleme hatası:', error);
        return res.status(500).json({ hata: 'Rezervasyon eklenirken bir hata oluştu.' });
    }
}

exports.sorgula = async (req, res) => {
    try {
        const { telefonNo } = req.query;

        if (!telefonNo) {
            return res.status(400).json({ hata: ' telefon numarasını girin.' });
        }
        if (!/^\d{10}$/.test(telefonNo)) {
            return res.status(400).json({ hata: 'Telefon numarası 10 haneli bir sayı olmalıdır.' });
        }

        const baglanti = await poolPromise;
        const rezervasyonlar = await baglanti.request()
            .input('telefonNo', telefonNo)
            .query(`
                SELECT * FROM Rezervasyon
                WHERE TelefonNo = @telefonNo;
            `);

        if (rezervasyonlar.recordset.length === 0) {
            return res.status(404).json({ mesaj: 'Bu telefon numarasıyla eşleşen rezervasyon bulunamadı.' });
        }

        return res.status(200).json({
            mesaj: 'Rezervasyon bulundu.',
            rezervasyon: rezervasyonlar.recordset
        });
    } catch (error) {
        console.error('Rezervasyon sorgulama hatası:', error);
        return res.status(500).json({ hata: 'Rezervasyon sorgulanırken bir hata oluştu.' });
    }
}

exports.guncelle = async (req, res) => {
    try {

        const { rezervasyonId, rezervasyonTarihi, baslangicSaati, bitisSaati, kisiSayisi, adSoyad, telefonNo, not } = req.body;

        if (!rezervasyonId || !rezervasyonTarihi || !baslangicSaati || !bitisSaati || !kisiSayisi || !adSoyad || !telefonNo) {
            return res.status(400).json({ hata: 'Lütfen gerekli tüm alanları doldurun.' });
        }
        if (isNaN(kisiSayisi) || kisiSayisi <= 0) {
            return res.status(400).json({ hata: 'Kişi sayısı geçerli bir sayı olmalıdır.' });
        }
        if (!moment(rezervasyonTarihi, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({ hata: 'Rezervasyon tarihi geçerli bir tarih formatında olmalıdır (YYYY-MM-DD).' });
        }
        if (!moment(baslangicSaati, 'HH:mm', true).isValid() || !moment(bitisSaati, 'HH:mm', true).isValid()) {
            return res.status(400).json({ hata: 'Başlangıç ve bitiş saatleri geçerli bir saat formatında olmalıdır (HH:mm).' });
        }
        if (!/^\d{10}$/.test(telefonNo)) {
            return res.status(400).json({ hata: 'Telefon numarası 10 haneli bir sayı olmalıdır.' });
        }
        if (not && not.length > 500) {
            return res.status(400).json({ hata: 'Not 500 karakterden fazla olamaz.' });
        }

        const formatadSoyad = adSoyad.trim().toLowerCase();
        const formatRezervasyonTarihi = moment(rezervasyonTarihi).format('YYYY-MM-DD');
        const formatBaslangicSaati = moment(baslangicSaati, 'HH:mm').format('HH:mm');
        const formatBitisSaati = moment(bitisSaati, 'HH:mm').format('HH:mm');

        const baglanti = await poolPromise;

                const mevcut = await baglanti.request()
            .input('rezervasyonTarihi', formatRezervasyonTarihi)
            .input('baslangicSaati', formatBaslangicSaati)
            .input('bitisSaati', formatBitisSaati)
            .query(`
                SELECT COUNT(*) AS sayi FROM Rezervasyon
                WHERE RezervasyonTarihi = @rezervasyonTarihi
                AND (
                (BaslangicSaati <= @bitisSaati AND BitisSaati >= @baslangicSaati)
                )
    `        );

        if (mevcut.recordset[0].sayi > 0) {
            return res.status(409).json({ hata: 'Bu tarih ve saat aralığında zaten bir rezervasyon var.' });
        }

        await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .input('rezervasyonTarihi', formatRezervasyonTarihi)
            .input('baslangicSaati', formatBaslangicSaati)
            .input('bitisSaati', formatBitisSaati)
            .input('kisiSayisi', kisiSayisi)
            .input('adSoyad', formatadSoyad)
            .input('telefonNo', telefonNo)
            .input('not', not)
            .query(`
                UPDATE Rezervasyon
                SET RezervasyonTarihi = @rezervasyonTarihi,
                    BaslangicSaati = @baslangicSaati,
                    BitisSaati = @bitisSaati,
                    KisiSayisi = @kisiSayisi,
                    AdSoyad = @adSoyad,
                    TelefonNo = @telefonNo,
                    Notlar = @not
                WHERE RezervasyonId = @rezervasyonId;
            `);

        return res.status(200).json({ mesaj: 'Rezervasyon başarıyla güncellendi.' });
    }
    catch (error) {
        console.error('Rezervasyon güncelleme hatası:', error);
        return res.status(500).json({ hata: 'Rezervasyon güncellenirken bir hata oluştu.' });
    }
}

exports.sil = async (req, res) => {
    try {
        const { rezervasyonId } = req.body;

        if (!rezervasyonId) {
            return res.status(400).json({ hata: 'Rezervasyon ID gerekli.' });
        }

        const baglanti = await poolPromise;

        const guncelleme = await baglanti.request()
            .input('rezervasyonId', rezervasyonId)
            .query(`
                UPDATE Rezervasyon
                SET Durum = 'iptal edildi'
                WHERE RezervasyonId = @rezervasyonId
            `);

        if (guncelleme.rowsAffected[0] === 0) {
            return res.status(404).json({ hata: 'Rezervasyon bulunamadı.' });
        }

        res.status(200).json({ mesaj: 'Rezervasyon iptal edildi olarak işaretlendi.' });
    } catch (error) {
        console.error('Rezervasyon iptali hatası:', error);
        res.status(500).json({ hata: 'Rezervasyon iptal edilirken bir hata oluştu.' });
    }
}