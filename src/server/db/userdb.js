const { mssql, pool } = require('./db.js');

const GetUserProfile = async (userId) => {
    await pool.connect();

    const result = await pool.request()
        .input('Id', userId)
        .execute('GetUserProfile')
    
    return result.recordset;
}

module.exports = {
    GetUserProfile
}