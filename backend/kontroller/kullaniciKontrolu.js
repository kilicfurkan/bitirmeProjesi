const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("../konfigurasyon/veritabani");

exports.kayitOl = async (req, res) => {
  try {
    const {kullanici_adi, isim, email, sifre, telefon, rol } = req.body;
    const havuz = await poolPromise;
    const hashedPassword = await bcrypt.hash(sifre, 10);

    await havuz.request()
      .input("kullanici_adi", kullanici_adi)
      .input("isim", isim)
      .input("email", email)
      .input("sifre", hashedPassword)
      .input("telefon", telefon)
      .input("rol", rol)
      .query("INSERT INTO Kullanicilar (kullanici_adi, isim, email, sifre, telefon, rol) VALUES (@kullanici_adi, @isim, @email, @sifre, @telefon, @rol)");

    res.json({ mesaj: "Kullanıcı başarıyla kaydedildi." });
  } catch (err) {
    res.status(500).json({ hata: err.message });
  }
};

exports.kullaniciGiris = async (req, res) => {
  try {
    const { email, sifre } = req.body;
    const havuz = await poolPromise;

    const result = await havuz.request()
      .input("email", email)
      .query("SELECT * FROM Kullanicilar WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ hata: "Kullanıcı bulunamadı." });
    }

    const kullanici = result.recordset[0];
    const dogruSifre = await bcrypt.compare(sifre, kullanici.sifre);
    if(!dogruSifre) {
      return res.status(400).json({ hata: "Geçersiz şifre." });
    }

    const token = jwt.sign(
      { email: kullanici.email, rol: kullanici.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({mesaj : "Giriş başarılı ", token });
  } catch (error) {
    res.status(500).json({ hata: error.message});
  }
}

exports.kullaniciProfilGetir = async (req, res) => {
  try {
    const{ email }  = req.kullanici;
    const havuz = await poolPromise;

    const result = await havuz.request()
      .input("email", email)
      .query("SELECT kullanici_adi, isim, email, telefon, rol, olusturulma_tarihi FROM Kullanicilar WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ hata: "Kullanıcı bulunamadı." });
    }

        res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ hata: error.message});
  }
}

exports.kullaniciGuncelle = async (req, res) => {
  try {
    const { email } = req.kullanici;
    const { kullanici_adi, isim, sifre, telefon, rol } = req.body;
    const havuz = await poolPromise;
    const hashedPassword = sifre ? await bcrypt.hash(sifre, 10) : undefined;

    await havuz.request()
     .input("kullanici_adi", kullanici_adi)
     .input("isim",isim)
     .input("sifre", hashedPassword)
     .input("telefon", telefon)
     .input("rol", rol)
     .input("email", email)
     .query("UPDATE Kullanicilar SET kullanici_adi = @kullanici_adi, isim = @isim, sifre = COALESCE(@sifre,sifre), telefon = @telefon, rol = @rol WHERE email = @email")

     res.json({mesaj : "Kullanıcı başarıyla güncellendi."});
  } catch (error) {
    res.status(500).json({ hata : error.message});
  }
}