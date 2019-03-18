var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/requestgroups', function (req, res) {
    var token = getToken(req.headers);
    request.get({
        headers: {'Authorization': 'Token ' + token},
        url: 'https://observation-portal-dev.lco.global/api/requestgroups/',
        json: true}, function (error, response, data) {
        if (error) {
            throw error;
        }
        // console.log(response);
        res.json({sucess: true, data: data});
    })
});


router.post('/requestgroups', function (req, res) {
    var token = getToken(req.headers);
    request.post({
        headers: {'Authorization': 'Token ' + token},
        url: 'https://observation-portal-dev.lco.global/api/requestgroups/',
        body: req.body,
        json: true}, function (error, response, data) {
        if (error) {
            throw error;
        }
        res.json({sucess: true, msg: 'OK', data: data});
    });
});

router.delete('/requestgroups/:id', function (req, res) {
    var token = getToken(req.headers);
    var req_group_id = req.params.id;
    console.log(token);
    console.log(req_group_id);
    request.post({
        headers: {'Authorization': 'Token ' + token},
        url: 'https://observation-portal-dev.lco.global/api/requestgroups/' + req_group_id + '/cancel/',
        json: true}, function (error, response, data) {
        if (error) {
            throw error;
        }
        // console.log();
        res.json({sucess: true, msg: 'OK', data: data});
    });

});

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


module.exports = router;
