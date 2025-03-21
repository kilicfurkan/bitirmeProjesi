const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "").trim();
  if (!token)
    { 
    return res.status(401).json({ mesaj: "Erişim reddedildi." });
    }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.kullanici = verified;
    next();
  } catch (err) {
    res.status(400).json({ mesaj: "Geçersiz token." });
  }
};