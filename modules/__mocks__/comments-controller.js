'use strict'

const commentsController = jest.genMockFromModule('../comments-controller')

// Mock adding a new comment response
commentsController.add = async(commentObject) => {

	if(Object.keys(commentObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock retrieving one comment
commentsController.getById = async(commentID) => {

	const mockedInvalidID = 6666

	if(commentID == mockedInvalidID) {
		return {}
	} else {
		return {'_id': 1234, comment: 'test comment'}
	}
}

// Mock retrieving all comments
commentsController.getAll = async(queryObject) => {

	if(Object.keys(queryObject).length == 0) {
		return [{'_id': 1234, 'comment': 'test comment'}]
	} else {
		return [{'_id': 2345, 'comment': 'queried comment'}]
	}
}

// Mock updating a comment response
commentsController.update = async(commentID, newCommentDetailsObject) => {

	if(Object.keys(newCommentDetailsObject).length == 0) {
		return false
	} else {
		return true
	}
}

// Mock deleting a comment response
commentsController.delete = async(commentID) => {

	const mockedInvalidID = 6666

	if(commentID == mockedInvalidID) {
		return false
	} else {
		return true
	}
}

module.exports = commentsController
