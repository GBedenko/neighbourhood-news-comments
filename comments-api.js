#!/usr/bin/env node

'use strict'

console.log('Booting Up Comments API Server...')

// Import koa packages
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

// Setup koa packages
const app = new Koa()
app.use(bodyParser())
const router = new Router()

// Import package used to assign status codes for responses easily
const status = require('http-status-codes')

// Port used for this microservice
const port = 8082

// Import own module for communicating with comments backend
const commentsController = require('./modules/comments-controller')

// Allow connections only from localhost, inform client requests the content type is json
app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'localhost')
	ctx.set('content-type', 'application/json')
	await next()
})

// GET Requests for all Comments
router.get('/api/v1.0/comments', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')

	// Request the comments object from the controller
	const comments = await commentsController.getAll()

	// Assign the status code to 200 and response body object as all the comments
	ctx.status = status.OK
	ctx.body = comments
})

// GET Request for one Comment
router.get('/api/v1.0/comments/:comment_id', async ctx => {

	// Allow only get requests to this endpoint function
	ctx.set('Allow', 'GET')

	// Request one comment object from the controller using the provided id
	const comment = await commentsController.getById(ctx.params.comment_id)

	// Assign the status code to 200 and response body object as the found comment
	ctx.status = status.OK
	ctx.body = comment
})

// POST Request for a new Comment
router.post('/api/v1.0/comments', async ctx => {

	// Allow only post requests to this endpoint function
	ctx.set('Allow', 'POST')

	// Send the new comment object to the controller using the client request body
	const addCommentResponse = await commentsController.add(ctx.request.body)

	// Assign the status code to 201 and response body object as a boolean to confirm the comment was added
	ctx.status = status.CREATED
	ctx.body = {status: 'success', commentAddedSuccessfully: addCommentResponse}
})

// PUT Request to update an existing Comment
router.put('/api/v1.0/comments/:comment_id', async ctx => {

	// Allow only put requests to this endpoint function
	ctx.set('Allow', 'PUT')

	// Send the updated comment object to the controller using the client request body for the provided comment id
	const updateCommentResponse = await commentsController.update(ctx.params.comment_id, ctx.request)

	// Assign the status code to 201 and response body object as a boolean to confirm the comment was updated
	ctx.status = status.CREATED
	ctx.body = {status: 'success', commentUpdatedSuccessfully: updateCommentResponse}
})

// DELETE Request to remove an existing Comment
router.del('/api/v1.0/comments/:comment_id', async ctx => {

	// Allow only delete requests to this endpoint function
	ctx.set('Allow', 'DELETE')

	// Request the provided comment id's object to be deleted by the controller
	const deleteCommentResponse = await commentsController.delete(ctx.params.comment_id)

	// Assign the status code to 200 and response body object as a boolean to confirm the comment was deleted
	ctx.status = status.OK
	ctx.body = {status: 'success', commentDeletedSuccessfully: deleteCommentResponse}
})

// Assign all routes/endpoints to the Koa server
app.use(router.routes())
app.use(router.allowedMethods())

// Run the server, show helpful message to know which port it is running on
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

// Export the endpoints module so that it can be tested
module.exports = server
