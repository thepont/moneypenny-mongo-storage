var ObjectID = require('mongodb').ObjectID;
var logger = require('moneypenny-mongo-storage/util/logger');

/**
 * Creates a new Collection for a specific MongoDB collection.
 *
 * This collection class wraps Promises around common mongodb function
 * @see {@link db} 
 * @param dbCollection{Object} the MongoDB collection to use.
 * @class
 */

const ERROR_NO_PARAMS = "Please supply approprate parameters";

var checkParams = function(param){
    return new Promise((resolve, reject) => {
        if (typeof(param) === "undefined"){
            var err = Error(ERROR_NO_PARAMS);
            logger.error(err);
            return reject(err);
        }
        return resolve(param);
    });
}

var Collection = function(dbCollection) { 
    /**
     * Returns an array of documents found with the find criteria sorted by the sort (param.sort) criteria,
     * and found using the (param.find) find critera
     * 
     * @param {Query} params paramters for finding the documents, object with param.query, param.projection and param.sort
     * @returns {Promise<Object[]>} array of documents found from the query.
     */

    this.find = function(params){
       return checkParams(params)
            .then(()=>{            
                return new Promise((resolve, reject) => {
                    var query = params.query || {};
                    var projection = params.projection || {};
                    var sort = params.sort || {};
                    dbCollection.find(query,projection).sort(sort).toArray((err, results) => {
                            if (err) {
                                return reject(err);
                            }                   
                        return resolve(results);
                    });
                });
            });
    };
     
    /**
    * Returns a single document found with the query passed in via param.query, 
    * using the projection param.projection
    *
    * @param {Query} params paramters object with a query and projection
     * @returns {Promise<Object>} first document found with the query.
    */
     
    this.findOne = function(params){
        return checkParams(params)
            .then(()=>{  
                return new Promise((resolve, reject) => {
                    var query = params.query || {};
                    var projection = params.projection || {};
                    dbCollection.findOne(query ,projection, function(err, result) {
                            if (err) {
                                return reject(err);
                            }
                        return resolve(result);
                    });
                });
            });
    };
    
    /**
    * Saves a document to the database.
    * 
    * @param {Object} doc document to save into database.
    * @returns {Promise<Object>} document saved in the database
    */
    
    this.save = function(doc) {
        console.log('saving doc', dbCollection);
        return checkParams(doc).then(()=>{
            return new Promise((resolve, reject) => {    
                if (doc._id) {
                    doc._id = new ObjectID(doc._id);
                }
                console.log('saving doc1');
                dbCollection.save(doc, function(err, result) {
                    if (err) {
                        console.log('saving doc2');
                        return reject(err);
                    }
    
                    if (doc._id) {
                        console.log('saving doc3');
                        return resolve(doc);
                    }
                    console.log('saving doc4');
                    return resolve(result.ops[0]);
                });
            });
        });
    };
    
    /**
     * Updates a document using the documents _id property as the query for updating.
     * 
     * @param {Object} doc document to update in the database.
     * @returns {Promise<Object>} Document updated
     */
    this.updateWithId = function(doc){
        return checkParams(doc)
            .then(()=>{ 
                return checkParams(doc._id) 
                })
            .then(()=>{ 
                return this.update({_id : doc._id}, doc)
            });
    };
    
    /**
     * Updates all documents matching a query.
     *
     * @param {Query} query query to use to find documents to update
     * @param {Object} doc document to update in the database.
     * @returns {Promise<Object>} Document updated
     */

    this.update = function(query, doc){
        return new Promise(function(resolve, reject) {
            dbCollection.update(query, doc, (err, records) => {
                if (err) {
                    return reject(err);
                }
                return resolve(doc);
            });
        });
    };
    
    /**
     * Inserts a new document into the database.
     *
     * @param {Object} doc document to insert.
     * @returns {Promise<Object>} document saved inserted into the database
     */
 
    this.insert = function(doc) {
        return new Promise((resolve, reject) => {
            dbCollection.insert(doc, (err, records) => {
                if (err) {
                    return reject(err);
                }
                return resolve(doc);
            });
        }); 
    };
    
    /**
     * Aggregates a collection.
     * 
     * @param {Object[]} array for aggregation pipeline.
     * @return {Promise<Object[]>} documents that match the aggregation.
     */

    this.aggregate = function(query){
        return new Promise((resolve, reject) => {
            dbCollection.aggregate(query).toArray((err, results) => {
                    if (err) {
                        return reject(err);
                    }                   
                return resolve(results);
            });
        }); 
    };


    /**
     * Removes documents that match a a collection.
     * 
     * @param {Query} query that matches documents to be removed
     * @return {Promise<Integer>} Number of documents removed.
     */
    this.remove = function(params){
        return checkParams(params)
            .then(()=>{ 
                return checkParams(params.query)
                })
            .then(()=>{
                return new Promise((resolve, reject) => {
                    var query = params.query;
                    dbCollection.remove(query, (err, num) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve(num);
                    })
                });
            });
    }
}; 

module.exports = Collection;


