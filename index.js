'use strict';


//dependencies
var _ = require('lodash');
var express = require('express');
var router = express.Router();

//HTTP endpoints


/**
 * @function
 * @description irina express based authentication workflows
 * @param  {Object} options valid irina express options
 * @public
 */
module.exports = exports = function IrinaExpress(options) {
    //prepare options
    options = options || {};

    //extend defaults options
    //with custom options
    var defaults = {
        model: 'User'
    };

    options = _.merge(defaults, options);


    //--------------------------------------------------------------------------
    //
    //--------------------------------------------------------------------------


    /**
     * @description return irina express router
     */
    return router;
};