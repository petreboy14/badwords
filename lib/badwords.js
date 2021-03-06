var detector = (function(){
	function Filter(){
		this.list = require('./lang.json').words;
	}

	Filter.prototype.isProfane = function isProfane(string){
		var foundProfane = false;
		for(var i = 0; i < this.list.length; i++) {
			var words = string.split(" ");
			for (var j = 0; j < words.length; j++) {
				if (words[j].toLowerCase().replace(/\*|\+|\-|\./g, '') == this.list[i].toLowerCase()) {
					return true;
				}
			}
		}
		return false;
	};

	Filter.prototype.replaceWord = function replaceWord(string){
		return string.replace(/\*|\+|\-|\./g, '').split("").map(function(c, i){
			return (i !== 0) ? "*" : c;
		}).join("");
	};

	Filter.prototype.clean = function clean(string){
		return string.split(" ").map(function(word){
			return this.isProfane(word) ? this.replaceWord(word) : word;
		}.bind(this)).join(" ");
	};

	Filter.prototype.addWords = function addWords(words) {
		words = (words instanceof Array) ? words : [words];
		this.list = this.list.concat(words);
	};

	return Filter;
})();

String.prototype.clean = function clean(){
	var filter = new detector();
	return filter.clean(this);
};

module.exports = new detector();
