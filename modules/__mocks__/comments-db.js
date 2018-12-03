'use strict'

const commentsDB = jest.genMockFromModule('../comments-db')

// Mock adding one resource to provided collection
commentsDB.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock retrieve all resources from a given collection
commentsDB.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	resolve([{'_id': 1234 , 'comment': 'test comment'}])
})

// Mock retrieve a specific resource from a collection
commentsDB.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	resolve({'_id': 1234, 'comment': 'test comment'})
})


// Mock update a resource with the provided ID and new values object
commentsDB.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock delete a resource by its given ID
commentsDB.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	resolve(true)
})

module.exports = commentsDB
