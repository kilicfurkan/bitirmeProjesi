module.exports = (req, res, next) => {
    if(req.kullanici.rol !== "admin")
    {
        return res.status(403).json({ mesaj: "Yetkiniz yok." });
    }
}