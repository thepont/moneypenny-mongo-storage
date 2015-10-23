var ObjectID = require('mongodb').ObjectID;

/**
 * Creates a new Collection for a specific MongoDB collection.
 *
 * This collection class wraps Promises around common mongodb function
 * @see {@link db} 
 * @param dbCollection{Object} the MongoDB collection to use.
 * @class
 */

var Collection = function(dbCollection) {
    /**
     * Returns an array of documents found with the find criteria sorted by the sort (param.sort) criteria,
     * and found using the (param.find) find critera
     * 
     * @param {Object} params paramters for finding the documents, object with param.query, param.projection and param.sort
     * @returns {Promise<Object[]>} array of documents found from the query.
     */

    this.find = function(params){
        return new Promise((resolve, reject) => {
            console.log(params);
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
    };
     
    /**
    * Returns a single document found with the query passed in via param.query, 
    * using the projection param.projection
    *
    * @param {Object} params paramters object with a query and projection
    */
     
    this.findOne = function(params){
        var query = params.query || {};
        var projection = params.projection || {};
        
        return new Promise((resolve, reject) => {
            dbCollection.findOne(query ,projection, function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                return resolve(result);
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
        return new Promise((resolve, reject) => {    
            if (doc._id) {
                doc._id = new ObjectID(doc._id);
            }
            
            dbCollection.save(doc, function(err, result) {
                if (err) {
                    return reject(err);
                }

                if (doc._id) {
                    return resolve(doc);
                }
                return resolve(result.ops[0]);
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
        return this.update({_id : doc._id}, doc);
    };
    
    /**
     * Updates all documents matching a query.
     *
     * @param {Object} query query to use to find documents to update
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
     * @return {Object[]} documents that match the aggregation.
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

    this.remove = function(params){
        var query = params.query;
        return new Promise((resolve, reject) => {
            dbCollection.remove(query, (err, num) => {
                if(err){
                    return reject(err);
                }
                return resolve(num);
            })
        });
    }
}; 

module.exports = Collection;


