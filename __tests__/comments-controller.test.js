'use strict'

const commentsController = require('../modules/comments-controller')

jest.mock('../modules/comments-db')

describe('Add comments controller functionality', async() => {

	test('Adding a new comment sends it to the database', async done => {
                
                const addCommentResponse = await commentsController.add({"comment":"test comment"})

                expect(addCommentResponse).toBeTruthy()
                
                done()
        })
        
	test('Adding an empty comment returns a failed request to the database', async done => {
                
                const addCommentResponse = await commentsController.add({}).then((response) => response)

                expect(addCommentResponse).toEqual(Error('Trying to add an empty object'))
                
                done()
	})
})

describe('Get all comments controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {
                
                const response = await commentsController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "comment":"test comment"}])
                
                done()
	})
})

describe('Get one comment controller functionality', () => {

	test('Requesting the database for one comment recieves correct response from the database', async done => {
                
                const response = await commentsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "comment":"test comment"})
                
                done()
        })
        
	test('Requesting the database for a comment that doesnt exist returns a failed request from the database', async done => {
                
                const response = await commentsController.getById("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Update comment controller functionality', () => {

	test('Updating a comment recieves a success response from the database', async done => {
                
                const response = await commentsController.update("1234", {"comment":"test comment updated"})

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Updating a comment with an empty new comment object recieves a failed response from the database', async done => {
                
                const response = await commentsController.update("1234", {})

                expect(response).toEqual(Error('Trying to update an object with an empty object'))
                
                done()
	})
        
	test('Updating a comment that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await commentsController.update("6666", {"comment":"test comment updated"})

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})

describe('Delete comment controller functionality', () => {

	test('Deleting a comment recieves a success response from the database', async done => {
                
                const response = await commentsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
        })
        
	test('Deleting a comment that doesnt exist recieves a failed response from the database', async done => {
                
                const response = await commentsController.delete("6666")

                expect(response).toEqual(Error('Trying to request an object that doesnt exist'))
                
                done()
	})
})