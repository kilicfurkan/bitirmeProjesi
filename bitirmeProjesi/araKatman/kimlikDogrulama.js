const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.kimlikDogrulama = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ hata: 'Yetkisiz erişim. Lütfen token sağlayın.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const dogrulanmisKullanici = jwt.verify(token, process.env.JWT_SECRET);
        req.kullanici = dogrulanmisKullanici;
        next();
    } catch (error) {
        return res.status(401).json({ hata: 'Geçersiz veya süresi dolmuş token.' });
    }
}