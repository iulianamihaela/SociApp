const mssql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: false,
    }
};

var pool = new mssql.ConnectionPool(config);

module.exports = {
    mssql,
    pool
}