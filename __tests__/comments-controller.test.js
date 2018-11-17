'use strict'

const commentsController = require('../modules/comments-controller')

jest.mock('../modules/comments-db')

describe('Add comments controller functionality', async() => {

	test('Recieving a new comment sends it to the database', async done => {

                // expect.assertions(1)
                
                const addCommentResponse = await commentsController.add({"comment":"test comment"})

                expect(addCommentResponse).toBeTruthy()
                
                done()
	})
})

describe('Get all comments controller functionality', () => {

        test('Recieving a get request recieves an array response from the database', async done => {

                // expect.assertions(1)
                
                const response = await commentsController.getAll()
                
                expect(response).toEqual([{"_id": 1234, "comment":"test comment"}])
                
                done()
	})
})

describe('Get one comment controller functionality', () => {

	test('Recieving a get request for one comment recieves one comment response from the database', async done => {

                // expect.assertions(1)
                
                const response = await commentsController.getById("1234")

                expect(response).toEqual({"_id": 1234, "comment":"test comment"})
                
                done()
	})
})

describe('Update comment controller functionality', () => {

	test('Recieving a put request for one comment recieves a success response from the database', async done => {

                // expect.assertions(1)
                
                const response = await commentsController.update("1234", {"comment":"test comment updated"})

                expect(response).toBeTruthy()
                
                done()
	})
})

describe('Delete comment controller functionality', () => {

	test('Recieving a delete request for one comment recieves a success response from the database', async done => {

                // expect.assertions(1)
                
                const response = await commentsController.delete("1234")

                expect(response).toBeTruthy()
                
                done()
	})
})