'use strict'

// Import package for mongodb client
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')

const databaseName = 'local_new_comments_db'

// Add one resource to provided collection
exports.addResourceToCollection = (databaseURL, collectionName, newResource) => new Promise((resolve, reject) => {

	console.log('New resource being added to database: ' + databaseName + '. collection: ' + collectionName)

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to add a new resource to the given collection
	MongoClient.connect(databaseURL, (err, db) => {

		const dbo = db.db(databaseName)

		dbo.collection(collectionName).insertOne(newResource, (err, res) => {
			console.log('Document inserted to mongodb database: ' + databaseName + ', collection: ' + collectionName)
			db.close()
			resolve(true)
		})
	})
})

// Retrieve all resources from a given collection
exports.getAllFromCollection = (databaseURL, collectionName) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to find all resources in the given collection
	MongoClient.connect(databaseURL, (err, db) => {

		// Create an instance of the mongodb database
		const dbo = db.db(databaseName)

		// Mongodb query to find all resources from the collection and save it to an array called results
		// Once completed, pass the result as the parameter to the callback function
		dbo.collection(collectionName).find({}).toArray((err, result) => {
			db.close()
			resolve(result)
		})
	})
})


// Retrieve a specific resource from a collection
exports.getResourceFromCollection = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	MongoClient.connect(databaseURL, (err, db) => {

		const dbo = db.db(databaseName)

		dbo.collection(collectionName).findOne({'_id': new mongodb.ObjectId(resourceID)}, (err, result) => {
			db.close()
			resolve(result)
		})
	})
})

// Update a resource with the provided ID and new values object
exports.updateResource = (databaseURL, collectionName, resourceID, newValuesObject) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to update the resource matching the id
	MongoClient.connect(databaseURL, (err, db) => {

		const dbo = db.db(databaseName)

		dbo.collection(collectionName).updateOne({_id: new mongodb.ObjectID(resourceID)}, {$set: newValuesObject}, (err, res) => {
			console.log('Resource with id ' + resourceID + ' has been updated')
			db.close()
			resolve(true)
		})
	})
})

// Delete a resource by its given ID
exports.deleteResource = (databaseURL, collectionName, resourceID) => new Promise((resolve, reject) => {

	// Connect to the mongodb database
	// Once done, runs the callback to execute the query to delete one resource matching the id
	MongoClient.connect(databaseURL, (err, db) => {

		const dbo = db.db(databaseName)

		dbo.collection(collectionName).deleteOne({_id: new mongodb.ObjectID(resourceID)}, (err, obj) => {
			console.log('Resource with id ' + resourceID + ' has been deleted')
			db.close()
			resolve(true)
		})
	})
})

// Find a resource by a query object
exports.findResourceFromCollection = (databaseURL, collectionName, resourceObject) => new Promise((resolve, reject) => {

	MongoClient.connect(databaseURL, (err, db) => {

		const dbo = db.db(databaseName)

		dbo.collection(collectionName).find(resourceObject).toArray((err, result) => {
			db.close()
			resolve(result)
		})
	})
})
