const { poolPromise } = require("../konfigurasyon/veritabani");
const moment = require('moment');

exports.rezervasyonEkle = async (req, res) => {
    try {
        const { kullanici_id, masa_id,rezervasyon_tarihi, baslangic_saati, bitis_saati, kisi_sayisi, durum } = req.body;
        const format_rezervasyon_tarihi = moment(rezervasyon_tarihi, 'YYYY-MM-DD').format('YYYY-MM-DD');
        const format_baslangic_saati = moment(baslangic_saati, 'HH:mm').format('HH:mm:ss');
        const format_bitis_saati = moment(bitis_saati, 'HH:mm').format('HH:mm:ss');
        const havuz = await poolPromise;

        await havuz.request()
            .input("kullanici_id", kullanici_id)
            .input("masa_id", masa_id)
            .input("rezervasyon_tarihi", format_rezervasyon_tarihi)
            .input("baslangic_saati", format_baslangic_saati)
            .input("bitis_saati", format_bitis_saati)
            .input("kisi_sayisi", kisi_sayisi)
            .input("durum", durum)
            .query("INSERT INTO Rezervasyonlar (kullanici_id, masa_id, rezervasyon_tarihi, baslangic_saati, bitis_saati, kisi_sayisi, durum) VALUES (@kullanici_id, @masa_id, @rezervasyon_tarihi, @baslangic_saati, @bitis_saati, @kisi_sayisi, @durum)");
    } catch (error) {
        res.status(500).json({ hata: error.message });
    }
}

exports.rezervasyonlariGetir = async (req, res) => {
    try {
        const havuz = await poolPromise;

        const result = await havuz.request()
            .query("SELECT * FROM Rezervasyonlar");

        if (result.recordset.length === 0) {
            return res.status(404).json({ hata: "Rezervasyon bulunamadı." });
        }

        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ hata: error.message });
    }
}

exports.rezervasyonGuncelle = async (req, res) => {
    try {
        const { rezervasyon_id, kullanici_id, masa_id, rezervasyon_tarihi, baslangic_saati, bitis_saati, kisi_sayisi, durum } = req.body;
        const havuz = await poolPromise;
    
        await havuz.request()
            .input("rezervasyon_id", rezervasyon_id)
            .input("kullanici_id", kullanici_id)
            .input("masa_id", masa_id)
            .input("rezervasyon_tarihi", rezervasyon_tarihi)
            .input("baslangic_saati", baslangic_saati)
            .input("bitis_saati", bitis_saati)
            .input("kisi_sayisi", kisi_sayisi)
            .input("durum", durum)
            .query("UPDATE Rezervasyonlar SET kullanici_id = @kullanici_id, masa_id = @masa_id, rezervasyon_tarihi = @rezervasyon_tarihi, baslangic_saati = @baslangic_saati, bitis_saati = @bitis_saati, kisi_sayisi = @kisi_sayisi, durum = @durum WHERE rezervasyon_id = @rezervasyon_id");
    
            res.status(200).json({ mesaj: "Rezervasyon başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ hata: error.message });
    }
}

exports.rezervasyonIptal = async (req, res) => {
    try {
        const { rezervasyon_id } = req.body;
        const havuz = await poolPromise;
    
        await havuz.request()
            .input("rezervasyon_id", rezervasyon_id)
            .query("UPDATE Rezervasyonlar SET durum = 'iptal edildi' WHERE rezervasyon_id = @rezervasyon_id");
        res.status(200).json({ mesaj: "Rezervasyon başarıyla iptal edildi." });
    } catch (error) {
        res.status(500).json({ hata: error.message });
    }
}