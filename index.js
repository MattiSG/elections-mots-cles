#!/usr/bin/env node

var INPUT_FILE = 'listes2010t1.csv',
	LIST_FILE  = 'mots.txt'

var fs = require('fs');

var parse = require('csv').parse;


parse(fs.readFileSync(LIST_FILE), function(err, tags) {
	if (err)
		throw err;

	parse(fs.readFileSync(INPUT_FILE), function(err, lists) {
		if (err)
			throw err;

		lists.forEach(function(list) {
			console.log(countTags(list[1], tags));
		});
	});
});

function countTags(listName, tags) {
	var result = [];

	tags.forEach(function(tagGroup) {
		tagGroup.forEach(function(tag) {
			result[tag] = + !! ~ listName.indexOf(tag.toUpperCase());
		});
	});

	return result;
}
