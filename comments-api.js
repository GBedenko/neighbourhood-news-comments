#!/usr/bin/env node

'use strict'

console.log("Booting Up Comments API Server...")

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const router = new Router()

const status = require('http-status-codes')

const port = 8082

const commentsController = require('./modules/comments-controller')

app.use( async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'localhost')
	ctx.set('content-type', 'application/json')
	await next()
})

router.get('/api/v1.0/comments', async ctx => {
    ctx.set('Allow', 'GET')    
	try {
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		debugger
		const comments = await commentsController.getAll()
		ctx.status = status.OK
		ctx.body = comments
    } catch(err) {
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

router.get('/api/v1.0/comments/:comment_id', async ctx => {
    ctx.set('Allow', 'GET')    
	try {
		if(ctx.get('error')) throw new Error(ctx.get('error'))
		ctx.status = status.OK
		ctx.body = {status: 'success', message: {item: 'xxx'}}
		const comment = await commentsController.getById(ctx.params.comment_id)
		ctx.status = status.OK
		ctx.body = comment
    } catch(err) {
		ctx.status = status.NOT_FOUND
		ctx.body = {status: 'error', message: err.message}
	}
})

router.post('/api/v1.0/comments', async ctx => {
    ctx.set('Allow', 'POST')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const newComment = await commentsController.add(ctx.request)
		ctx.status = status.CREATED
		ctx.body = {status: 'success', message: {comment: newComment}}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

router.put('/api/v1.0/comments/:comment_id', async ctx => {
    ctx.set('Allow', 'PUT')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const updateCommentResponse = await commentsController.update(ctx.params.comment_id, ctx.request)
		ctx.status = status.CREATED
		ctx.body = {status: updateCommentResponse}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

router.del('/api/v1.0/comments/:comment_id', async ctx => {
    ctx.set('Allow', 'DELETE')    
	try {        
        if(ctx.get('error')) throw new Error(ctx.get('error'))
        
		const deleteCommentResponse = await commentsController.delete(ctx.params.comment_id)
		ctx.status = status.OK
		ctx.body = {status: deleteCommentResponse}
    } catch(err) {
		ctx.status = status.BAD_REQUEST
		ctx.body = {status: 'error', message: err.message}
	}
})

app.use(router.routes())
app.use(router.allowedMethods())
const server = app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports = server