var assert = require("assert");
var automate = require("../server/automateHome.js");
var request = require("supertest");
var should = require("should");
describe('Change light Status', function() {
  describe('setLightStatus()', function () {
    it('should change the light state', function () {
        var req = {
            "lightStatus":"OFF",
            "id":"1"
        }
        var url = "http:/localhost:5000"
        request(url)
        .put('/lights')
        .send(req)
        .end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(400);
              done();
            });
        
        });
  });
  describe("getLights", function () {
    it('should fetch all the lights', function () {
        var url = "http:/localhost:5000"
        request(url)
        .get('/lights')
        .end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(400);
              done();
            });
        
        });
  });
});