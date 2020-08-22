"use strict";

var findWords = function(board, words) {
    let ROWS = board.length;
    if(!words.length || !ROWS) {
        return [];
    }
    
    let COLS = board[0].length;
    let getVisitedArr = function() {
        let visited = [];
        for(let i=0; i< ROWS; i++) {
            visited[i] = [];
            for(let j=0; j<COLS; j++) {
                visited[i][j] = false;
            }
        }

        return visited;
    };

    let availableWords = [];
    for(let k=0; k<words.length; k++) {
        let word = words[k];
        let visited = getVisitedArr();
        let found = false;

        for(let i=0; i<ROWS && !found; i++) {
            for(let j=0; j<COLS && !found; j++) {
                let path = wordPresent(word, word.length, board, visited, [i, j], ROWS, COLS, []);
                if(path) {
                    // console.log("Found word, path: ", path);
                    found = true;
                }
            }
        }

        if(found) {
            availableWords.push(word);
        }
    }

    return availableWords;
};

/*
    true/false
*/
var wordPresent = function(word, wordLength, board, visited, [i, j], ROWS, COLS, path) {
    if(!wordLength) {
        return path;
    }
    
    if(j>=COLS || i>=ROWS || j<0 || i<0 || visited[i][j]) {
        return false;
    }
    
    let char = word[wordLength-1];
    if(board[i][j] != char) {
        return false;
    } else{
        // console.log("Found char at index i,j: ", i, j);
        path.push([char, i, j]);
        wordLength -= 1;
        visited[i][j] = true;
        let flag = wordPresent(word, wordLength, board, visited, [i, j+1], ROWS, COLS, path) ||
            wordPresent(word, wordLength, board, visited, [i, j-1], ROWS, COLS, path) ||
            wordPresent(word, wordLength, board, visited, [i+1, j], ROWS, COLS, path) ||
            wordPresent(word, wordLength, board, visited, [i-1, j], ROWS, COLS, path);
        
        if(!flag){
            visited[i][j] = false;
            path.pop();
            return false;
        }
        
        return path;
    }
};

let res = findWords(
    [["a","a"]],
    ["a"]
);
console.log("res: ", res);