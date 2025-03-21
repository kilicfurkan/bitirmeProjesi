require('dotenv').config();
const sql = require('mssql');

console.log('DB Host:', process.env.DB_HOST);
console.log('DB Port:', process.env.DB_PORT);

const config = {
    user: process.env.DB_USER || 'furkandeneme',
    password: process.env.DB_PASSWORD || '123456789',
    database: process.env.DB_NAME || 'RestoranRezervasyon',
    server: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
      encrypt: false,
      enableArithAbort: true,
      trustServerCertificate: true
    },
  };

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('Sql Server bağlantısı başarılı');
    return pool;
})
.catch(err => 
    console.log('Sql Server bağlantısı başarısız', err)
);

module.exports = {
    sql, poolPromise
};