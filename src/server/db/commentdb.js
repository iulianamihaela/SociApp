const { mssql, pool } = require('./db.js');

const AddComment = async (postId, email, text) => {
    await pool.connect();

    const result = await pool.request()
        .input('PostId', postId)
        .input('Email', email)
        .input('Text', text)
        .execute('AddComment')

    return true;
}

const GetComments = async (postId, email) => {
    await pool.connect();

    const result = await pool.request()
        .input('PostId', postId)
        .input('Email', email)
        .execute('GetComments')

    return result.recordset;
}

module.exports = {
    AddComment,
    GetComments
}