'use strict'

const commentsDB = require('../modules/comments-db')

describe('Adding a new resource to a mongodb collection', async() => {

    afterEach(async() => {
        // Function to find the comment that the tests will add to the database
        let findAddedComment = commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                                 "comments",
                                                                                 {"comment":"test comment"}).then((result) => result)

        // Call the function and wait for the response
        let findAddedCommentResponse = await findAddedComment

        // Save the id of the test comment that was added
        let addedCommentID = findAddedCommentResponse[findAddedCommentResponse.length-1]._id

        // Delete the test comment so that it doesn't affect live database
        commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                           "comments",
                                           addedCommentID)
    });    

	test('Adding a new comment inserts it into the database successfully', async done => {

        expect.assertions(1)
        
        // Send a test comment object to the correct database
        const response = await commentsDB.addResourceToCollection("mongodb://localhost:27017/comments_database",
                                                                           "comments",
                                                                           {"comment":"test comment"})        
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response).toBeTruthy()
        
        done()
	})
})

describe('Requesting one resource from a mongodb collection', async() => {

    let resourceIdToRequest;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can retrieve the correct one
        await commentsDB.addResourceToCollection("mongodb://localhost:27017/comments_database",
                                                          "comments",
                                                          {"comment":"test comment"})

        let findAddedComment = commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                                 "comments",
                                                                                 {"comment":"test comment"}).then((result) => result)

        let findAddedCommentResponse = await findAddedComment

        // Save the id of the test comment that was added
        resourceIdToRequest = findAddedCommentResponse[findAddedCommentResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test comment so that it doesn't affect live database
        commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                           "comments",
                                           resourceIdToRequest)
    })

	test('Request a mongodb object returns the correct object that was requested', async done => {

        expect.assertions(1)
        
        // Send a test comment object to the correct database
        const response = await commentsDB.getResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                             "comments",
                                                                             resourceIdToRequest).then((comment) => comment)      
        
        // Expect a true boolean response if adding to mongodb was successful
        expect(response.comment).toEqual("test comment")
        
        done()
	})
})

describe('Requesting all resources from a mongodb collection', async() => {

	test('Requesting a mongodb collection returns an array of objects', async done => {

        expect.assertions(1)

        const response = await commentsDB.getAllFromCollection("mongodb://localhost:27017/comments_database",
                                                                        "comments").then((comment) => comment)      
        
        expect(Array.isArray([response])).toBe(true);
        done()
	})
})

describe('Updating a resource in a mongodb collection', async() => {

    let resourceIdToUpdate;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await commentsDB.addResourceToCollection("mongodb://localhost:27017/comments_database",
                                                          "comments",
                                                          {"comment":"test comment"})

        let findAddedComment = commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                                 "comments",
                                                                                 {"comment":"test comment"}).then((result) => result)

        let findAddedCommentResponse = await findAddedComment

        // Save the id of the test comment that was added
        resourceIdToUpdate = findAddedCommentResponse[findAddedCommentResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test comment so that it doesn't affect live database
        commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                           "comments",
                                           resourceIdToUpdate)
    })

	test('Updating a mongodb resource returns a successful response', async done => {

        expect.assertions(1)

        const updateResponse = await commentsDB.updateResource("mongodb://localhost:27017/comments_database",
                                                                  "comments",
                                                                  resourceIdToUpdate,
                                                                  {"comment":"test comment"}).then((response) => response)      
        
        expect(updateResponse).toBeTruthy()

        done()
	})
})

describe('Deleting a resource in a mongodb collection', async() => {

    let resourceIdToDelete;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await commentsDB.addResourceToCollection("mongodb://localhost:27017/comments_database",
                                                          "comments",
                                                          {"comment":"test comment"})

        let findAddedComment = commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                                 "comments",
                                                                                 {"comment":"test comment"}).then((result) => result)

        let findAddedCommentResponse = await findAddedComment

        // Save the id of the test comment that was added
        resourceIdToDelete = findAddedCommentResponse[findAddedCommentResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test comment so that it doesn't affect live database
        commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                           "comments",
                                           resourceIdToDelete)
    })

	test('Deleting a mongodb collection returns a successful response', async done => {

        expect.assertions(1)

        const deleteResponse = await commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                                                  "comments",
                                                                  resourceIdToDelete).then((response) => response)      
        
        expect(deleteResponse).toBeTruthy()

        done()
	})
})

describe('Finding a resource in a mongodb collection', async() => {

    let resourceToFindId;
    let resourceToFind;

    beforeEach(async() => {        
        // Add a new object to mongodb, which will be tested that it can be updated in the test
        await commentsDB.addResourceToCollection("mongodb://localhost:27017/comments_database",
                                                          "comments",
                                                          {"comment":"test comment"})

        let findAddedComment = commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                                 "comments",
                                                                                 {"comment":"test comment"}).then((result) => result)

        let findAddedCommentResponse = await findAddedComment

        resourceToFind = findAddedCommentResponse
        
        // Save the id of the test comment that was added
        resourceToFindId = findAddedCommentResponse[findAddedCommentResponse.length-1]._id
    }); 
    
    afterEach(async() => {
        // Delete the test comment so that it doesn't affect live database
        commentsDB.deleteResource("mongodb://localhost:27017/comments_database",
                                           "comments",
                                           resourceToFindId)
    })

	test('Finding a known resource in a mongodb collection returns the correct object', async done => {

        expect.assertions(1)

        const findResponse = await commentsDB.findResourceFromCollection("mongodb://localhost:27017/comments_database",
                                                                  "comments",
                                                                  {"comment":"test comment"}).then((response) => response)      
        
        expect(findResponse).toEqual(resourceToFind)

        done()
	})
})
