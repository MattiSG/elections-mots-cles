#!/usr/bin/env node

var INPUT_FILE = 'listes2010t1.csv',
	LIST_FILE  = 'mots.txt'

var fs = require('fs');

var csv = require('csv');


csv.parse(fs.readFileSync(LIST_FILE), function(err, tags) {
	if (err)
		throw err;

	csv.parse(fs.readFileSync(INPUT_FILE), function(err, lists) {
		if (err)
			throw err;

		var result = [];

		result.push(lists[0].concat(tags.map(function(tag) { return tag[0] })));

		lists.forEach(function(list) {
			var count = countTags(list[1], tags);

			result.push(list.concat(count));
		});

		csv.stringify(result, function(err, output) {
			if (err)
				throw err;

			console.log(output);
		});
	});
});

function countTags(listName, tags) {
	var result = [];

	tags.forEach(function(tagGroup) {
		tagGroup.forEach(function(tag) {
			result.push(+ !! ~ listName.indexOf(tag.toUpperCase()));
		});
	});

	return result;
}
