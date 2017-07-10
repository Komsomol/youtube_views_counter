/*jshint esversion: 6 */

const env = require('env2')('.env');
const got = require('got');
const async = require('async');

// Enter your own YT API Key here
const youtubeApiKey = process.env.YT_API_KEY;

// Array of Youtube UIDs
const array = ["d1D7ImXE7sE", "W1EO0f6BPPA", "DqTLvjssFbg", "GqmS2Aq9tlk", "LeA0pyZ_bPw", "cnjcVW_aulM", "D8FPm4Qs4o4", "g5Pn69zN0J4", "0CkiXo3MNJ0", "oAuEXU_eCp8", "EF_85_H2EMw", "Y_SIPNIyFrY", "NmxBQx5Br2w", "6jKAZr4fIvE", "5L0nmcU7uNU", "YreUTks29dc", "YLjPGoHqYM8", "LzBsKQO1D_s"];

// API URL + statistics endpoint
const url = 'https://www.googleapis.com/youtube/v3/videos?key='+youtubeApiKey+'&part=statistics&id=';

// We will push results into this array
let data = [];

const getData = () => {

	// We will use Async to hit the API multiple times using the YT UIDs
	async.each(array, (id, callback) => {

		got(url + array)
			.then(response => {
				let d = (JSON.parse(response.body));

				// Removing unnecessary keys we are not interesting in
				delete d.items[0].kind;
				delete d.items[0].etag;

				// Push to our data array
				data.push(d.items[0]);

				// Callback executes on complete
				callback();
			})
			// If error
			.catch(error => {
				console.log(error.response.body);
			});

	}, err => {
		// if any of the id processing produced an error, err would equal that error
		if( err ) {
			// One of the iterations produced an error.
			// All processing will now stop.
			console.log('A id failed to process');
		} else {
			// Otherwise success
			console.log('All ids have been processed successfully');
			console.log(data);
		}
	});

};

// Run our function
getData();

// Can be exported as node module as well
module.exports = getData;