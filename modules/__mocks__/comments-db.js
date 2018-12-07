'use strict'

const commentsDB = jest.genMockFromModule('../comments-db')

// Mock adding one resource to provided collection
commentsDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/comments_database' && collectionName == 'comments') {

		if(Object.keys(newResource).length == 0) {
			reject(new Error('Trying to add an empty object'))
		} else {
			resolve(true)
		}
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve all resources from a given collection
commentsDB.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	if(databaseURL == 'mongodb://localhost:27017/comments_database' && collectionName == 'comments') {
		resolve([{'_id': 1234 , 'comment': 'test comment'}])
	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock retrieve a specific resource from a collection
commentsDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/comments_database' && collectionName == 'comments') {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve({'_id': 1234, 'comment': 'test comment'})
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock update a resource with the provided ID and new values object
commentsDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/comments_database' && collectionName == 'comments') {

		if(Object.keys(newValuesObject).length == 0) {
			reject(new Error('Trying to update an object with an empty object'))

		} else if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))

		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

// Mock delete a resource by its given ID
commentsDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	const mockedInvalidID = 6666

	if(databaseURL == 'mongodb://localhost:27017/comments_database' && collectionName == 'comments') {

		if(resourceID == mockedInvalidID) {
			reject(new Error('Trying to request an object that doesnt exist'))
		} else {
			resolve(true)
		}

	} else {
		reject(new Error('Incorrect database details passed'))
	}
})

module.exports = commentsDB
