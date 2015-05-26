'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var Request = require('mock-express-request');
var Response = require('mock-express-response');
var faker = require('faker');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//signup logics
var signup = require(path.join(__dirname, '..', '..', 'lib', 'signup'))(User);

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

                expect(response.statusCode).to.equal(201);

                expect(_user.email).to.equal(user.email);
                expect(_user.confirmationToken).to.exist;
                expect(_user.registeredAt).to.exist;

                done();
            }
        });

        signup(request, response);
    });


    it('should be able to return validation error if valid email is not provided', function(done) {
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

                console.log(_response);

                expect(response.statusCode).to.equal(400);

                done();
            }
        });

        signup(request, response);
    });

});