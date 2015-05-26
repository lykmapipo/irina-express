'use strict';

//dependencies


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

        User
            .register(request.body, function(error, registerable) {
                if (error) {
                	console.log(error);
                    response.status(400);
                    response.json(error);
                } else {
                	console.log(registerable);
                    response.status(201);
                    response.json(registerable);
                }
            });
    };
};