'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var faker = require('faker');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//signup logics
var signup = require(path.join(__dirname, '..', '..', 'lib', 'signup'))(User);
var _user_;

describe('Signup', function() {

    it('should be able to signup new credentials', function(done) {
        var user = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        var request = new Request({
            body: user
        });

        var response = new Response({
            request: request,
            finish: function() {
                var _user = response._getJSON();

                //remember user
                _user_ = _user;

                expect(response.statusCode).to.equal(201);

                expect(_user.email).to.equal(user.email);

                done();
            }
        });

        signup(request, response);
    });


    it('should be able to return validation error if valid credentials are not provided', function(done) {
        var user = {
            email: '',
            password: ''
        };

        var request = new Request({
            body: user
        });

        var response = new Response({
            request: request,
            finish: function() {
                var _response = response._getJSON();

                expect(response.statusCode).to.equal(400);
                expect(_response.code).to.equal(400);
                expect(_response.name).to.equal('ValidationError');

                expect(_response.errors.password).to.exist;
                expect(_response.errors.email).to.exist;

                done();
            }
        });

        signup(request, response);
    });


    it('should be able to return unique error if user with same credentials exist', function(done) {
        var user = _.clone(_user_);
        user.password = faker.internet.password();

        var request = new Request({
            body: user
        });

        var response = new Response({
            request: request,
            finish: function() {
                var _response = response._getJSON();

                expect(response.statusCode).to.equal(400);
                expect(_response.code).to.equal(400);
                expect(_response.name).to.equal('ValidationError');

                expect(_response.errors.email).to.exist;

                done();
            }
        });

        signup(request, response);
    });

});