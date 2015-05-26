'use strict';

//dependencies
var mongoose = require('mongoose');
var ValidationError = mongoose.Error.ValidationError;
var _ = require('lodash');


/**
 * @description Creates a new user. 
 *              The body of the request must include the email, the password 
 *              and may contain extra user attributes
 *
 * @public
 */
module.exports = function signup(User) {
    /**
     * @function
     *
     * @description handle and process Http POST /signup
     * @param  {HttpRequest} request
     * @param  {HttpResponse} response
     */
    return function(request, response) {

        //TODO sanitize request.body
        //TODO make this controller thin

        User
            .register(request.body, function(error, registerable) {
                if (error) {
                    response.status(400);

                    //reduce validation errors returned
                    if (error instanceof ValidationError) {
                        _.forEach(error.errors, function(validatorError) {
                            //remove ValidatorError properties
                            delete validatorError.properties;

                            //remove ValidatorError kind
                            delete validatorError.kind;
                        });
                    }

                    //unique error
                    if (error.name === 'MongoError' && error.code === 11000) {
                        error.name = 'ValidationError';
                        error.message = 'User already exists';
                        error.errors = {
                            email: {
                                message: 'Credential already taken',
                                name: 'ValidatorError',
                                path: 'email',
                                value: request.body.email
                            }
                        };

                        delete error.index;
                        delete error.errmsg;
                    }

                    //add status code
                    error.code = 400;

                    response.json(error);
                } else {
                    response.status(201);
                    response.json(registerable);
                }
            });
    };
};