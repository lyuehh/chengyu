/*
 * chengyu
 * https://github.com/lyuehh/chengyu
 *
 * Copyright (c) 2013 lyuehh
 * Licensed under the MIT license.
 */

var fs = require('fs');
var _ = require('underscore');
var text = fs.readFileSync('../data/1.txt', 'utf8');
var textArr = text.split('\n');

exports.listAll = function() {
    console.log(text);
};

exports.listByPattern = function (p) {
    if (p.length !== 4) {
        throw new Error('pattern need 4 letters, like AABB ABCC ...');
    }
    console.log('not finished, sorry ...');
    return;

    // var arr = p.split('');
    // var letter = _.uniq(arr);
    // console.log(letter);
    // switch (letter.length) {
    //     case 1: // 只有1个字母, AAAA
    //         console.log(1);
    //     break;
    //     case 2: // 只有2个字母, AABB, ABAB, AAAB, ABBB etc ...
    //         console.log(2);
    //     break;
    //     case 3:
    //         console.log(3);
    //     break;
    //     case 4:
    //         console.log(4);
    //     break;
    //     default:
    //         console.log('xx');
    //     break;
    // }

};

exports.listByWord = function(word) {
    if (word.length !== 4) {
        throw new Error('need 4 words, like 一xxx');
    }
    var map = _.reduce(word.split(''), function(memo, w, i) {
        if (w !== 'x' && w !== 'X') {
            memo[i] = w;
        }
        return memo;
    }, []);
    var words= _.filter(textArr, function(i) {
        var lineArr = i.split('');
        return _.all(lineArr, function(w, i) {
            return (_.isUndefined(map[i])) || map[i] === lineArr[i];
        });
    });
    console.log(words.join('\n'));
};

exports.listByInclude = function(include) {
    var words = _.filter(textArr, function(i) {
        return i.indexOf(include) !== -1;
    });
    console.log(words.join('\n'));
};
