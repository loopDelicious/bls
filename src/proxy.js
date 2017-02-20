var express = require('express');
var request = require('request');
var key = require('../secrets.js');
var redis = require('redis');
var client = redis.createClient();
var bodyParser = require('body-parser');
var scraperjs = require('scraperjs');

var app = express();

// create a proxy so server side can access indeed API

// allow CORS access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/indeed', function(req, res) {

    var city = req.body.location.join("-"); // receive array of geography join with dashes
    var occupation = req.body.occupation.join("-"); // receive array of occupation and join with dashes
    var url = 'https://www.indeed.com/salaries/' + occupation + '-Salaries,-' + city;

    // check if results are in redis
    client.get(url, function (err, data) {
        if (data) {
            res.send(data);
            return;
        }

        // if results are not in redis, fetch from indeed and store in redis
        scraperjs.StaticScraper.create(url)
            .scrape(function ($) {

                var results = [{
                    salary: $(".cmp-sal-salary span"),
                    sample: $(".cmp-salary-header-content"),
                    relative: $(".cmp-sal-average-above"),
                    min: $(".cmp-sal-min span"),
                    max: $(".cmp-sal-max span"),
                }];
                return results.map(function () {
                    return $(this).text();
                }).get();
                // return $(".cmp-sal-salary span").map(function() {
                //     return $(this).text();
                // }).get();
            })
            .then(function (salaryData) {
                client.setex(url, 3600, salaryData);
                res.send(salaryData);
            });
    });

    // TODO: pull more than just average salary (sample size, relative trend, min, max, etc)
// https://www.indeed.com/salaries/Software-Engineer-Salaries,-San-Francisco-CA
// https://www.indeed.com/salaries/Software-Engineer-Salaries,-San-Francisco-Bay-Area-CA

});


app.post('/bls', function(req, res) {

    // var url = '	https://api.bls.gov/publicAPI/v2/timeseries/data/';
    // res.header("Content-Type", "application/json");

    // // check if results are in redis
    // client.get(url, function (err, data) {
    //     if (data) {
    //         res.send(data);
    //         return;
    //     }
    //
    //     // if results are not in redis, fetch from indeed and store in redis
    //     request(url, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             client.setex(url, 3600, body);
    //             res.send(body);
    //         }
    //     });
    // });

    var options = {
        method: 'POST',
        url: 'https://api.bls.gov/publicAPI/v2/timeseries/data/',
        headers: {
            'cache-control': 'no-cache',
        },
        body: {
            seriesid: req.body.seriesid,
            startyear: req.body.startyear,
            endyear: req.body.endyear,
            catalog: false,
            calculations: true,
            annualaverage: true,
            registrationkey: key.bls
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });

});


app.listen(process.env.PORT || 4700);

