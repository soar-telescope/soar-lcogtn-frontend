var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/requestgroups/', function (req, res) {
    var token = getToken(req.headers);
    request.get({
        headers: {'Authorization': 'Token ' + token},
        url: 'https://observation-portal-dev.lco.global/api/requestgroups/',
        qs: req.query,
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

router.get('/simbad/', function (req, res)  {
    var new_data = {};
    var qs = {
        'output.format': 'ASCII',
        'Ident': req.query.id};
    request.get({
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id',
        qs: qs,
        json: true}, function (error, response, data) {
        if (error) {
            throw error;
        }
        var component = data.split('\n');
        var coords = component.filter(line => line.includes('Coordinates(ICRS'));
        if (coords.length === 1)  {
            coords = coords[0].split(':');
            // get references
            var coords_ref = coords[0].replace('Coordinates(', '').replace(')', '').split(',');
            new_data.epoch = coords_ref[1].split('=')[1];
            new_data.equinox = coords_ref[2].split('=')[1];
            // get coordinates
            new_data.ra = coords[1].split(' ').slice(1, 4).join(':');
            new_data.dec = coords[1].split(' ').slice(5, 8).join(':');
            console.log(new_data);
        }


        // console.log(coords);
        res.json({sucess: true, data: new_data});
    })
})

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
