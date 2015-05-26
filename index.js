'use strict';


//dependencies
var _ = require('lodash');
var inflection = require('inflection');
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
    options = options || {};

    //default options
    var defaults = {
        model: 'User'
    };

    //merge default options with custom provide options
    options = _.merge(defaults, options);

    //deduce mount path
    options.route =
        options.route ||
        inflection.pluralize(options.model.toLowerCase());


    /**
     * @description return irina express router
     */
    return router;
};