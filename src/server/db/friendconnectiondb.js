const { mssql, pool } = require('./db.js');

const CreateFriendship = async (email, imageURI, text) => {
    await pool.connect();

    const result = await pool.request()
        .input('FirstEmail', email)
        .input('SecondEmail', imageURI)
        .execute('CreateFriendship')

    return true;
}

const GetIncomingFriendRequests = async (email) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .execute('GetIncomingFriendRequests')

    return result.recordset;
}

const AcceptFriendRequest = async (sender, receiver) => {
    await pool.connect();

    const result = await pool.request()
        .input('Sender', sender)
        .input('Receiver', receiver)
        .execute('AcceptFriendRequest')

    return result.recordset;
}

const DeclineFriendRequest = async (sender, receiver) => {
    await pool.connect();

    const result = await pool.request()
        .input('Sender', sender)
        .input('Receiver', receiver)
        .execute('DeclineFriendRequest')

    return result.recordset;
}

module.exports = {
    CreateFriendship,
    GetIncomingFriendRequests,
    AcceptFriendRequest,
    DeclineFriendRequest
}