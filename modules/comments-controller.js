'use strict'

const databaseURL = "mongodb://localhost:27017/comments_database"
const commentsCollection = "comments"

const database = require('./comments-db')

// Function to add a new comment
exports.add = async(commentObject) => {
    
    const addComment = database.addResourceToCollection(databaseURL, commentsCollection, commentObject)
                        .then((result) => result)

    const addCommentResponse = await addComment

    return addCommentResponse
}

// Function to retrieve one comment
exports.getById = async(commentID) => {

    const getComment = database.getResourceFromCollection(databaseURL, commentsCollection, commentID)
                        .then((comment) => comment)
    
    const comment = await getComment

    return comment
}

// Function to retrieve all comments
exports.getAll = async() => {

    // Declare a function which will call the controller for all comments
    // Returns a Promise object with either a resolve or reject value
    const results = database.getAllFromCollection(databaseURL, commentsCollection)
                    .then((results) => results) // Obtains the result from the Promise object
    
    // Calls the results function, waits for response before continuing
    const finalResult = await results

    // Return the list of comments
    return finalResult
}

// Function to update a comment
exports.update = async(commentID, newCommentDetailsObject) => {

    const updateComment = database.updateResource(databaseURL, commentsCollection, commentID, newCommentDetailsObject)
                            .then((comment) => comment)

    const updateCommentResponse = await updateComment

    return updateCommentResponse
}

// Function to delete a comment
exports.delete = async(commentID) => {

    const deleteComment = database.deleteResource(databaseURL, commentsCollection, commentID)
                            .then((comment) => comment)

    const deleteCommentResponse = await deleteComment

    return deleteCommentResponse
}
