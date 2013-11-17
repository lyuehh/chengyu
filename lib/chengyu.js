/*
 * chengyu
 * https://github.com/lyuehh/chengyu
 *
 * Copyright (c) 2013 lyuehh
 * Licensed under the MIT license.
 */

var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var file = path.resolve(__dirname, '../data/1.txt');
var text = fs.readFileSync(file, 'utf8');
var textArr = text.split('\n');

exports.listAll = function() {
    console.log(text);
};

exports.listByPattern = function (word) {
    var pattern = ["AABB", "AABC", "ABCC", "ABBC"];
    if (!_.include(pattern, word)) {
        console.log("Now only support those: " + pattern.join(' '));
        return;
    }
    var words;
    switch (word) {
        case 'AABB':
            words = _.filter(textArr, function(i) {
                return (i[0] === i[1] && i[2] === i[3] && i[0] !== i[2]);
            });
            break;
        case 'AABC':
            words = _.filter(textArr, function(i) {
                return (i[0] === i[1] && i[2] !== i[3] && i[0] !== i[2] && i[1] !== i[3]);
            });
            break;
        case 'ABCC':
            words = _.filter(textArr, function(i) {
                return (i[0] !== i[1] && i[2] === i[3] && i[0] !== i[2] && i[1] !== i[3]);
            });
            break;
        case 'ABBC':
            words = _.filter(textArr, function(i) {
                return (i[0] !== i[3] && i[1] === i[2] && i[0] !== i[1]);
            });
            break;
        default:
            break;
    }
    console.log(words.join('\n'));
};

exports.listByWord = function(word) {
    var map = _.reduce(word.split(''), function(memo, w, i) {
        if (w !== 'x' && w !== 'X') {
            memo[i] = w;
        }
        return memo;
    }, []);
    var words = _.chain(textArr).filter(function(i) {
        return i.length === word.length;
    }).filter(function(i) {
        var lineArr = i.split('');
        return _.all(lineArr, function(w, i) {
            return (_.isUndefined(map[i])) || map[i] === lineArr[i];
        });
    }).value();
    console.log(words.join('\n'));
};

exports.listByInclude = function(include) {
    var words = _.filter(textArr, function(i) {
        return i.indexOf(include) !== -1;
    });
    console.log(words.join('\n'));
};
