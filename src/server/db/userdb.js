const { mssql, pool } = require('./db.js');

const GetUserProfile = async (userId) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', userId)
        .execute('GetUserProfile')

    if (result.recordset.length == 1) {
        return result.recordset[0];
    }

    return null;
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
    
    return (result.rowsAffected === null || result.rowsAffected.length === 0) ? 0 : result.rowsAffected[0];
}

const GetHashedPasswordForUser = async (email) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .execute('GetHashedPasswordForUser');
    
    if (result.recordset.length == 1) {
        return result.recordset[0];
    }

    return null;
}

const UpdateUserProfile = async (id, description, location) => {
    await pool.connect();
    
    const result = await pool.request()
        .input('Id', id)
        .input('Description', description)
        .input('Location', location)
        .execute('UpdateUserProfile');
    
    if (result.recordset.length == 1) {
        return result.recordset[0];
    }

    return null;
}

module.exports = {
    GetUserProfile,
    CreateUser,
    GetHashedPasswordForUser,
    UpdateUserProfile
}