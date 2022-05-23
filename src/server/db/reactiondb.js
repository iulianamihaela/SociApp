const { mssql, pool } = require('./db.js');

const AddReaction = async (email, postId, reaction) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('PostId', postId)
        .input('Reaction', reaction)
        .execute('AddReaction')

    return true;
}

module.exports = {
    AddReaction
}