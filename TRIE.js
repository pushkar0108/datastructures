"use strict";

class Trie {
	constructor() {
		this.isWord = false;
		this.children = [];
		for(let i=0; i<26; i++) {
			this.children.push(null);
		}
	}

	insert(word) {
		let temp = this;
		for (let i=0; i<word.length; i++) {
			let index = word[i].charCodeAt(0) - 97;
			if(temp.children[index] == null) {
				temp.children[index] = new Trie();
			}

			temp = temp.children[index];
		}

		temp.isWord = true;
	}

	search(word) {
		let temp = this;
		for (let i=0; i<word.length; i++) {
			let index = word[i].charCodeAt(0) - 97;
			if(temp.children[index] == null) {
				return false;
			}

			temp = temp.children[index];
		}

		return (temp != null && temp.isWord);
	}

	autoSuggest(prefix) {
		let temp = this;
		for(let i=0; i<prefix.length; i++){
			let index = prefix[i].charCodeAt(0) - 97;
			if(temp.children[index] == null) {
				return false;
			}

			temp = temp.children[index];
		}

		let haveChildren = temp.children.some(child => child != null);
		
		if(!haveChildren) {
			if(temp.isWord){
				return [prefix];
			}
			
			return false;
		}

		// print all the available suggestions using DFS
		return Trie.autoSuggestUtil(temp, prefix, []);
	}

	static autoSuggestUtil(root, prefix, values = []){
		if(root.isWord){
			values.push(prefix);
		}

		root.children.forEach((child, index) => {
			if(child != null) {
				Trie.autoSuggestUtil(child, prefix + String.fromCharCode(97 + index), values);
			}
		});

		return values;
	}
}

// Unit test
(() => {
	if (require.main == module) {
		const root = new Trie();
		root.insert('aaabb');
		root.insert('aa');
		root.insert('aavvccc');
		root.insert('dsdsd');
		root.insert('aaacc');

		console.log(root.search('aaabb'));
		console.log(root.search('aaabbddd'));
		console.log(root.search('a'));
		console.log(root.autoSuggest('aa'));
	}
})();
