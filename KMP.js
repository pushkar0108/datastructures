"use strict";

class KMP {
  static search(str, pattern) {
    let lps = KMP.computeLPSArray(pattern);
    let i = 0;
    let j = 0;

    while(i < str.length) {
      if(str[i] == pattern[j]) {
        i++;
        j++;

        if(j == pattern.length) {
          console.log("Pattern present at index: ", i - pattern.length);
          j = lps[j-1];
        }
      } else if(str[i] != pattern[j]) {
        if(j == 0) {
          i++;
        } else {
          j = lps[j-1];
        }
      }
    }
  }

  /*
    lps[i] = the longest proper prefix of pat[0..i],
    which is also a suffix of pat[0..i]. 
  */
  static computeLPSArray(pattern) {
    let lps = [0]; // starting will be always 0
    let i = 1;
    let j = 0;

    while(i < pattern.length) {
      if(pattern[i] == pattern[j]) {
        lps[i] = j + 1;
        i++;
        j++;
      } else {
        if(j == 0) {
          lps[i] = 0;
          i++;
        } else {
          j = lps[j-1];
        }
      }
    }

    console.log("lps: ", lps);
    return lps;
  }
}

// Unit test
(() => {
	if (require.main == module) {
    KMP.search('aaabaabacaaba', 'aaba');
	}
})();
