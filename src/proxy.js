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

    var cities = req.body.locations;
    var occupations = req.body.occupations;
    var cityAndOccupations = cities.map( (city) => {
        return occupations.map( (occupation) => {
            return {
                location: city,
                occupation: occupation,
                url: 'https://www.indeed.com/salaries/' + occupation.replace(/ /g, "-") + '-Salaries,-' + city.replace(/ /g, "-")
            };
            // use regex to look for spaces in occupation and city and replace with dash
        });
    });

    // console.log(cityAndOccupations);
    //
    // var urls = cityAndOccupations.map( (cityCluster) => {
    //     return cityCluster.reduce( (occCluster) => {
    //         return occCluster.url;
    //     });
    // });

    var urls = [].concat.apply([], cityAndOccupations.map((cluster) => {
        return cluster.url;
    }));
    console.log(' urls ', urls);

    // var urls = [].concat.apply([], cityAndOccupations); // return a single array of urls

    // check if results are in redis using mget to bundle redis queries -- for dev turn off
    client.mget(urls, function (err, data) {
        if (data.indexOf(null) === -1) {
            console.log('return whole dataset');
            res.send(data);
            return;
        }
        console.log(data);
        var responseData;
        data.forEach( (datum, i) => {
            // if results are not in redis, fetch from indeed and store in redis
            if (datum === null) {
                console.log('run scraper on this ', urls[i]);
                scraperjs.StaticScraper.create(urls[i])
                    .scrape(function ($) {
                        return {
                            salary: $(".cmp-sal-salary span").map(function() {
                                return $(this).text();
                            }).get(),
                            sample: $(".cmp-salary-header-content").map(function() {
                                return $(this).text();
                            }).get(),
                            relative: $(".cmp-sal-average-above").map(function() {
                                return $(this).text();
                            }).get(),
                            minimum: $(".cmp-sal-min span").first().map(function() {
                                return $(this).text();
                            }).get(),
                            maximum: $(".cmp-sal-max span").first().map(function() {
                                return $(this).text();
                            }).get(),
                        };
                    })
                    .then(function (salaryData) {
                        var newData = JSON.stringify(salaryData);
                        client.setex(urls[i], 21600, newData);
                        console.log('set ', urls[i]);
                        console.log('newData ', newData);
                    });
            }
        });
        res.send(responseData);
    });
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

