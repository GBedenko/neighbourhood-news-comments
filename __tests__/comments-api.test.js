'use strict'

// Testing endpoints requries supertest package
const request = require("supertest");

const commentsAPI = require('../comments-api')

jest.mock('../modules/comments-controller')

// Test GET /comments
describe('GET /comments endpoint', async() => {

    afterEach(() => {
        commentsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting all comments returns a 200 status code', async done => {

        const response = await request(commentsAPI).get("/api/v1.0/comments")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting all comments returns a json object', async done => {

        const response = await request(commentsAPI).get("/api/v1.0/comments");

        expect(response.body).toEqual([{"_id": 1234, "comment": "test comment"}])

        done()
	})
})

// Test GET /comments/:comment_id
describe('GET /comments/:comment_id endpoint', async() => {

    afterEach(() => {
        commentsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Requesting a comment returns a 200 status code', async done => {

        const response = await request(commentsAPI).get("/api/v1.0/comments/123")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Requesting a comment returns a json object', async done => {

        const response = await request(commentsAPI).get("/api/v1.0/comments/123");

        expect(response.body).toEqual({"_id": 1234, "comment": "test comment"})

        done()
	})
})

// Test POST /comments
describe('POST /comments endpoint', async() => {

    afterEach(() => {
        commentsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Sending a new comment returns a 201 status code', async done => {

        const response = await request(commentsAPI).post("/api/v1.0/comments").send({"_id": 1234, "comment": "test comment"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Sending a new comment returns the correct json response object', async done => {

        const response = await request(commentsAPI).post("/api/v1.0/comments").send({"_id": 1234, "comment": "test comment"})

        expect(response.body).toEqual({"status": "success", "commentAddedSuccessfully": true})

        done()
	})
})

// Test PUT /comments/:comment_id
describe('PUT /comments/:comment_id endpoint', async() => {

    afterEach(() => {
        commentsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Updating a comment returns a 201 status code', async done => {

        const response = await request(commentsAPI).put("/api/v1.0/comments/1234").send({"_id": 1234, "comment": "new_comment"})

        expect(response.status).toEqual(201)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Updating a comment returns the correct json response object', async done => {

        const response = await request(commentsAPI).put("/api/v1.0/comments/1234").send({"_id": 1234, "comment": "new_comment"})

        expect(response.body).toEqual({"status": "success", "commentUpdatedSuccessfully": true})

        done()
	})
})

// Test DELETE /comments/:comment_id
describe('DELETE /comments/:comment_id endpoint', async() => {

    afterEach(() => {
        commentsAPI.close()
    });

    // Test that a request recieves the correct status code
	test('Deleting a comment returns a 200 status code', async done => {

        const response = await request(commentsAPI).del("/api/v1.0/comments/1234")

        expect(response.status).toEqual(200)

        done()
    })    

    // Test that the request recieves the correct JSON response
	test('Deleting a comment returns the correct json response object', async done => {

        const response = await request(commentsAPI).del("/api/v1.0/comments/1234")

        expect(response.body).toEqual({"status": "success", "commentDeletedSuccessfully": true})

        done()
    })
})