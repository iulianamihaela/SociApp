const { mssql, pool } = require('./db.js');

const AddPost = async (email, imageURI, text) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('ImageURI', imageURI)
        .input('Text', text)
        .execute('AddPost')

    return true;
}

const GetPostsForUser = async (email, userProfile) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('UserProfile', userProfile)
        .execute('GetPostsForUser')

    return result.recordset;
}

module.exports = {
    AddPost,
    GetPostsForUser
}