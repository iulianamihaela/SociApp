const { mssql, pool } = require('./db.js');

const AddPost = async (email, imageURI, text) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('ImageURI', imageURI)
        .input('Text', text)
        .execute('AddPost');

    return true;
}

const GetPostsForUser = async (email, userProfile) => {
    await pool.connect();

    const result = await pool.request()
        .input('Email', email)
        .input('UserProfile', userProfile)
        .execute('GetPostsForUser');

    return result.recordset;
}

const GetPost = async (postId, user) => {
    await pool.connect();

    const result = await pool.request()
        .input('PostId', postId)
        .input('Email', user)
        .execute('GetPost');
    
    if (result.recordset.length === 0)
        return null;

    return result.recordset[0];
}

module.exports = {
    AddPost,
    GetPostsForUser,
    GetPost
}