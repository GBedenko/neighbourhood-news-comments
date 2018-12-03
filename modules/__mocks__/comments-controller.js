'use strict'

const commentsController = jest.genMockFromModule('../comments-controller')

// Mock adding a new comment response
commentsController.add = async(commentObject) => {

	const response = true

	return response
}

// Mock retrieving one comment
commentsController.getById = async(commentID) => {

	const response = {'_id': 1234, comment: 'test comment'}

	return response
}

// Mock retrieving all comments
commentsController.getAll = async(queryObject) => {

	const response = [{'_id': 1234, 'comment': 'test comment'}]

	return response
}

// Mock retrieving a comment based on query object
commentsController.getByQuery = async(commentObject) => {

	const response = {'_id': 1234, comment: 'test comment'}

	return response
}

// Mock updating a comment response
commentsController.update = async(commentID, newCommentDetailsObject) => {

	const response = true

	return response
}

// Mock deleting a comment response
commentsController.delete = async(commentID) => {

	const response = true

	return response
}

module.exports = commentsController
