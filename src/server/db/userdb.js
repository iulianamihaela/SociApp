const { mssql, pool } = require('./db.js');

const GetUserProfile = async (userId) => {
    await pool.connect();

    const result = await pool.request()
        .input('Id', userId)
        .execute('GetUserProfile')
    
    return result.recordset;
}

const CreateUser = async (email, password, firstName, lastName, birthDate) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('Password', password)
        .input('FirstName', firstName)
        .input('LastName', lastName)
        .input('BirthDate', birthDate)
        .execute('CreateUser')
    
    return (result.rowsAffected === null || result.rowsAffected.length === 0) ? 0 : result.rowsAffected[0] ;
}

module.exports = {
    GetUserProfile,
    CreateUser
}