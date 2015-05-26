'use strict';

//dependencies
var async = require('async');
var mongoose = require('mongoose');
mongoose.plugin(require('mongoose-hidden')());
mongoose.plugin(require('mongoose-autopopulate'));
var Schema = mongoose.Schema;
var irina = require('irina');

//create user model
var UserSchema = new Schema({});
UserSchema.plugin(irina);
mongoose.model('User', UserSchema);


before(function(done) {
    //setup database
    mongoose.connect('mongodb://localhost/irina-express', done);
});

/**
 * @description wipe all mongoose model data and drop all indexes
 */
function wipe(done) {
    var cleanups = mongoose.modelNames()
        .map(function(modelName) {
            //grab mongoose model
            return mongoose.model(modelName);
        })
        .map(function(Model) {
            return async.series.bind(null, [
                //clean up all model data
                Model.remove.bind(Model),
                //drop all indexes
                Model.collection.dropAllIndexes.bind(Model.collection)
            ]);
        });

    //run all clean ups parallel
    async.parallel(cleanups, done);
}

//clean database
after(function(done) {
    wipe(function(error) {
        if (error && error.message !== 'ns not found') {
            done(error);
        } else {
            done(null);
        }
    });
});