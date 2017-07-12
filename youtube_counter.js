/*jshint esversion: 6 */
const env = require('env2')('.env');
const got = require('got');

// Enter your own YT API Key here
const youtubeApiKey = process.env.YT_API_KEY;

// Array of Youtube UIDs
const array = ["wZC5FoJ-cPU", "aSiAf_qLR4Y", "JlgyYb14O6Q", "mBmuNHtiUQ0", "UVswB4CpOZo", "a4C-vrM4VQA", "1s3g4Ic92tI", "koCGDN8y5SQ", "cNa1eXj90CE", "ASEWfySWb6Q", "qIbzN14kvXQ", "tyDSLVjQYWU", "WALepYw7Qww", "PAawCINgRDU", "47dR2HIAOwA", "KA7nhv6oq9s", "rln5G8Cahww", "01_u4evxMow", "dqNLSqAcIyg",
"RIwy5uNUfDA"];

// API URL + statistics endpoint
const url = 'https://www.googleapis.com/youtube/v3/videos?key='+youtubeApiKey+'&part=statistics&id=';

const getData = () => {

	// Youtube API returns an array of results if an array of UIDs is passed 
	got(url + array)
		.then(response => {
			if(response.statusCode === 200){
				processData(JSON.parse(response.body));
			}
		})
		// If error
		.catch(error => {
			console.log(error);
		});
};

const processData = (d) => {

	// check if all array elements have been returned
	if(d.pageInfo.totalResults === array.length){

		console.log("All results present, response matches array");

		// we map our results to get the viewcount only
		var counter = d.items.map(function(value, index ){
			return parseInt(value.statistics.viewCount,10);
		// we then add up all the results
		}).reduce(function(total, number){
			return total + number;
		});

		console.log("Total views for all UIDs is", counter);

	} else {

		console.log('mismatch ', d.pageInfo.totalResults, array.length);

	}
};

// Run our function
getData();