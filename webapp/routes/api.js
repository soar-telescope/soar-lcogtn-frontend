var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/requestgroups/', function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        request.get({
            headers: {'Authorization': 'Token ' + token},
            url: 'https://observation-portal-dev.lco.global/api/requestgroups/',
            qs: req.query,
            json: true}, function (error, response, data) {
            if (error) {
                throw error;
            } else  if (data.results) {
               res.json({success: true, msg: 'OK', data: data});
           } else {
               console.log(data);
               res.json({success: false, msg: data.detail});
           }
            // // console.log(response);
            // res.json({success: true, data: data});
        })
    } else {
        res.json({success: false, msg: 'Token does not exist'});
    }

});


router.post('/requestgroups', function (req, res) {
    var token = getToken(req.headers);
    if (token) {
       request.post({
           headers: {'Authorization': 'Token ' + token},
           url: 'https://observation-portal-dev.lco.global/api/requestgroups/',
           body: req.body,
           json: true}, function (error, response, data) {
           if (error) {
               throw error;
           } else if (data) {
               res.json({success: true, msg: 'OK', data: data});
           } else {
               console.log(data);
               res.json({success: false, data: data});
           }


       });
    } else {
        res.json({success: false, msg: 'Token does not exist'});
    }

});

router.delete('/requestgroups/:id', function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var req_group_id = req.params.id;
        request.post({
            headers: {'Authorization': 'Token ' + token},
            url: 'https://observation-portal-dev.lco.global/api/requestgroups/' + req_group_id + '/cancel/',
            json: true}, function (error, response, data) {
            if (error) {
                throw error;
            }
            // console.log();
            res.json({success: true, msg: 'OK', data: data});
        });
    } else {
        res.json({success: false, msg: 'Token does not exist'});
    }


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
            new_data.epoch = parseInt(coords_ref[1].split('=')[1].replace('J', ''));
            new_data.equinox = parseInt(coords_ref[2].split('=')[1]);
            // get coordinates
            new_data.ra = get_ra_to_deg(coords[1].split(' ')[1], coords[1].split(' ')[2], coords[1].split(' ')[3]);
            new_data.dec = get_dec_to_deg(coords[1].split(' ')[5], coords[1].split(' ')[6], coords[1].split(' ')[7]);
            // console.log(new_data);
        }

        var proper_motions = component.filter(line => line.includes('Proper motions:'));
        // console.log(proper_motions);
        if (proper_motions.length === 1) {
            new_data.proper_motion_ra = get_proper_motion_to_float(proper_motions[0].split(':')[1].split(' ')[1]);
            new_data.proper_motion_dec = get_proper_motion_to_float(proper_motions[0].split(':')[1].split(' ')[2]);
        } else {
            new_data.proper_motion_ra = 0;
            new_data.proper_motion_dec = 0;
        }
        res.json({success: true, data: new_data});
    })
});

get_proper_motion_to_float = function(pm) {
    var pm_float = parseFloat(pm);
    if (!isNaN(pm_float)) {
        return pm_float
    } else {
        return 0
    }
}

get_ra_to_deg = function(hh, mm, ss) {
    return (parseInt(hh) + parseInt(mm)/60 + parseFloat(ss)/3600) * 15
};

get_dec_to_deg = function(dd, mm, ss) {
    return parseInt(dd)/Math.abs(parseInt(dd)) * (Math.abs(parseInt(dd))  + parseInt(mm)/60 + parseFloat(ss)/3600 )
};

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
