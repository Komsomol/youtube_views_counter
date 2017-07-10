var env = require('env2')('.env');
var got = require('got');

var async = require('async');
var youtubeApiKey = process.env.YT_API_KEY;

var array = ["d1D7ImXE7sE", "W1EO0f6BPPA", "DqTLvjssFbg", "GqmS2Aq9tlk", "LeA0pyZ_bPw", "cnjcVW_aulM", "D8FPm4Qs4o4", "g5Pn69zN0J4", "0CkiXo3MNJ0", "oAuEXU_eCp8", "EF_85_H2EMw", "Y_SIPNIyFrY", "NmxBQx5Br2w", "6jKAZr4fIvE", "5L0nmcU7uNU", "YreUTks29dc", "YLjPGoHqYM8", "LzBsKQO1D_s"];

var url = 'https://www.googleapis.com/youtube/v3/videos?key='+youtubeApiKey+'&part=statistics&id=';

var data = [];
// assuming openFiles is an array of file names

var getData = function(){

	async.each(array, function(id, callback) {

		// Perform operation on id here.
		// console.log('Processing id ' + id);

		got(url + array)
			.then(function(response){
				var d = (JSON.parse(response.body));
				// data.push(response.body);
				
				delete d.items[0].kind;
				delete d.items[0].etag;

				// console.log(d.items[0]);

				data.push(d.items[0]);
				callback();
			})
			.catch(function(error){
				console.log(error.response.body);
			});

	}, function(err) {
		// if any of the id processing produced an error, err would equal that error
		if( err ) {
			// One of the iterations produced an error.
			// All processing will now stop.
			console.log('A id failed to process');
		} else {
			console.log('All ids have been processed successfully');
			console.log(data);
		}
	});

};

getData();

