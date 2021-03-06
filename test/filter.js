require('assert');
var filter = require('../lib/badwords.js');
var assert = require('better-assert');

describe('filter', function(){
	describe('clean',function(){
		it("Should replace a bad word within a sentence asterisks (******)",function(){
			assert(filter.clean("Don't be an ash0le") == "Don't be an ******");
		});

		it("Should replace multiple instances of any bad words within a sentence asterisks (******)",function(){
			assert(filter.clean("cnts ash0le knob xxx") == "**** ****** **** ***");
		});

		it("Should not replace anything within a sentence if there are no bad words",function(){
			assert(filter.clean("The cat ran fast") == "The cat ran fast");
		});
	});
});