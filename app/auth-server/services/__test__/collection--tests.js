var Collection = require('../collection');

var PromiseTest = require('auth-server/util/test/PromiseTest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var should = require('should');

describe('Collection()', ()=>{
	describe('find()', () => {
		var mockResult = [
			{},{test: 'test'}
		]
		var collection = new Collection({
			find : () => {
				return {
					sort : function(){
						return {
							toArray : function(callback) {
								callback(null, mockResult);
							}	
						}
					}
				}
			}
		});
		
		PromiseTest.itReturnsAPromise(collection.find);
		it('returns a resolved promise with the resulting array of documents on success', ()=> {
			return collection.find({ query: {} }).then((result)=>{
				result.should.equal(mockResult);
			});
		});
		it('recovers on a non existant query', ()=>{
			return collection.find({}).then((result)=>{
				result.should.equal(mockResult);
			});
		});
		
		it('returns a rejected promise with error from the database on error ', ()=>{
			
			var failedCollection = new Collection({
				find : ()=>{
					return {
						sort : ()=>{
							return {
								toArray : (callback)=>{
									callback(new Error(), null);
								}	
							}
						}
					}
				}
			});
			
			return PromiseTest.shouldThrowError(failedCollection.find, { query: {} });
		});
		

	});
	
	describe('findOne()', () => {
		var collection = new Collection({
			findOne: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.findOne);
		it('returns a resolved promise with the resulting document on success', () =>{
			var mockResult = {test: 'test'};
			var collection = new Collection({
				findOne: function(query, projection, callback){
					callback(null, mockResult)
				}
			});
			return collection.findOne({}).then(function(result){
				return result.should.equal(mockResult);
			});
		});
		it('returns a rejected promise with error from the database on error ', ()=>{
			var mockResult = {test: 'test'};
			var collection = new Collection({
				findOne: function(query, projection, callback){
					callback(new Error(), {})
				}
			});
			
			return PromiseTest.shouldThrowError(collection.findOne, {});
		});	
	});
	
	
	describe('save()', function(){
		var collection = new Collection({
			save: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.save);
		it('returns a resolved promise with the resulting document on success', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				save: function(query, callback){
					callback(null, mockResult)
				}
			});
			return collection.save(mockResult).then((result)=>{
				return result.should.equal(mockResult);
			});
		});
		it('returns a rejected promise with error from the database on error ', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var Collection = require('../collection.js')
			var collection = new Collection({
				save: function(query, callback){
					callback(new Error(), null)
				}
			});
			
			return PromiseTest.shouldThrowError(collection.save, mockResult);
		});	
		
		it('saves documents without ids', function(){
			var mockResult = {test: 'test'};
			var collection = new Collection({
				save: function(query, callback){
					callback(null, { ops : [ mockResult ]});
				}
			});
			return collection.save(mockResult).then(function(result){
				return result.should.equal(mockResult);
			});
		});
	});
	
	
	describe('updateWithId()', function(){
		var collection = new Collection({
			update: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.updateWithId);
		it('returns a resolved promise with the resulting updated document on success', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				update: function(query, projection, callback){
					callback(null, mockResult)
				}
			});
			
			return collection.updateWithId(mockResult).then(function(result){
				return result.should.equal(mockResult);
			});
		});
	});
	
	describe('update()', function(){
		
		var collection = new Collection({
			update: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.update);
		it('returns a resolved promise with the resulting document on success', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				update: function(query, projection, callback){
					callback(null, mockResult)
				}
			});
			
			return collection.update({}, mockResult).then(function(result){
				return result.should.equal(mockResult);
			});
		});
		it('returns a rejected promise with error from the database on error ', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				update: function(query, projection, callback){
					callback(new Error(), null)
				}
			});
			
			return PromiseTest.shouldThrowError(collection.update, {}, mockResult);
		});	
	});
	
	describe('insert()', function(){
		
		var collection = new Collection({
			insert: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.insert);
		
		it('returns a resolved promise with the resulting document on success', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				insert: function(document, callback){
					callback(null, mockResult)
				}
			});
			
			return collection.insert(mockResult).then(function(result){
				result.should.equal(mockResult);
			});
		});
		it('returns a rejected promise with the error from the database on error ', ()=>{
			var mockResult = {test: 'test', _id : '55a33804e4b00cdeb2520971'};
			var collection = new Collection({
				insert: function(document, callback){
					callback(new Error(), null)
				}
			});
			return PromiseTest.shouldThrowError(collection.insert, {}, mockResult);
		});	
	});
	
	describe('aggregate()', ()=>{
		var collection = new Collection({
			save: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.aggregate);
		it('returns a rejected promise with the error from the database on error ', ()=>{
			var collection = new Collection({
				aggregate: ()=>{ 
						return {
							toArray : (callback)=>{
								callback(new Error(), null);
							}
						}
					}	
			});
			return PromiseTest.shouldThrowError(collection.aggregate, {});
		});
		
		it('returns a resolved promise with the resulting documents on success', ()=>{
			var mockResult = [
				{},{test: 'test'}
			]
			var collection = new Collection(
				{
					aggregate: ()=>{ 
						return {
							toArray : (callback)=>{
								callback(null, mockResult);
							}
						}
					}	
				});
				
			return collection.aggregate({query:{}})
				.then(function(result){
					result.should.equal(mockResult);
				});
		});
	});
	describe('remove()', ()=>{
		var collection = new Collection({
			save: (query, callback) => {}
		});
		PromiseTest.itReturnsAPromise(collection.remove);
		it('returns a rejected promise with the error from the database on error', ()=>{
				var collection = new Collection({
				remove: function(document, callback){
					callback(new Error(), null)
				}
			});	
			return PromiseTest.shouldThrowError(collection.remove, { query: {} });
		});
		
		it('returns a resolved promise with the resulting number deleted on success', ()=>{
			var amtDeleted = 1;
			var collection = new Collection({
				remove: function(document, callback){
					callback(null, amtDeleted)
				}
			});	
			return collection.remove({query:{}})
				.then(function(result){
					result.should.equal(amtDeleted);
				});
		});
	});
});