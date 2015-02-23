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

		var header = lists.shift();
		header.push('contient_nom_candidat');
		header = header.concat(tags.map(function(tag) { return tag[0] }));

		result.push(header);

		lists.forEach(function(list) {
			var listName = list[1],
				count = countTags(listName, tags),
				containsCandidateNameAsNumber = containsAsNumber(listName, list[4]);

			list.push(containsCandidateNameAsNumber);
			list = list.concat(count);

			result.push(list);
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
			result.push(containsAsNumber(tag.toUpperCase(), listName));
		});
	});

	return result;
}

/** Returns 1 if hay contains needle, 0 otherwise.
*/
function containsAsNumber(needle, hay) {
	return + !! ~ hay.indexOf(needle);
}
