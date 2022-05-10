/**
 * @file gitdiff 消息解析器
 * @author errorrik(errorrik@gmail.com)
 */

(function (root) {
    var STAT_START = 2;
    var STAT_FILE_META = 3;
    var STAT_HUNK = 5;


    var parser = {
        /**
         * 解析 gitdiff 消息
         *
         * @param {string} source gitdiff消息内容
         * @return {Object}
         */
        parse: function (source) {
            var infos = [];
            var stat = STAT_START;
            var currentInfo;
            var currentHunk;
            var changeOldLine;
            var changeNewLine;


            var lines = source.split('\n');
            var linesLen = lines.length;
            var i = 0;

            while (i < linesLen) {
                var line = lines[i];

                if (line.indexOf('diff --git') === 0) {
                    // read file
                    currentInfo = {
                        hunks: [],
                        oldEndingNewLine: true,
                        newEndingNewLine: true
                    };

                    infos.push(currentInfo);


                    // 1. 如果oldPath是/dev/null就是add
                    // 2. 如果newPath是/dev/null就是delete
                    // 3. 如果有 rename from foo.js 这样的就是rename
                    // 4. 如果有 copy from foo.js 这样的就是copy
                    // 5. 其它情况是modify
                    var currentInfoType = null;


                    // read type and index
                    var simiLine;
                    simiLoop: while ((simiLine = lines[++i])) {
                        var spaceIndex = simiLine.indexOf(' ');
                        var infoType = spaceIndex > -1 ? simiLine.slice(0, spaceIndex) : infoType;

                        switch (infoType) {
                            case 'diff': // diff --git
                                i--;
                                break simiLoop;

                            case 'deleted':
                            case 'new':
                                var leftStr = simiLine.slice(spaceIndex + 1);
                                if (leftStr.indexOf('file mode') === 0) {
                                    currentInfo[infoType === 'new' ? 'newMode' : 'oldMode'] = leftStr.slice(10);
                                }
                                break;

                            case 'similarity':
                                currentInfo.similarity = parseInt(simiLine.split(' ')[2], 10);
                                break;

                            case 'index':
                                var segs = simiLine.slice(spaceIndex + 1).split(' ');
                                var revs = segs[0].split('..');
                                currentInfo.oldRevision = revs[0];
                                currentInfo.newRevision = revs[1];

                                if (segs[1]) {
                                    currentInfo.oldMode = currentInfo.newMode = segs[1];
                                }
                                break;
                            

                            case 'copy':
                            case 'rename':
                                var infoStr = simiLine.slice(spaceIndex + 1);
                                if (infoStr.indexOf('from') === 0) {
                                    currentInfo.oldPath = infoStr.slice(5);
                                }
                                else { // rename to
                                    currentInfo.newPath = infoStr.slice(3);
                                }
                                currentInfoType = infoType;
                                break;

                            case '---':
                                var oldPath = simiLine.slice(spaceIndex + 1);
                                var newPath = lines[++i].slice(4); // next line must be "+++ xxx"
                                if (oldPath === '/dev/null') {
                                    newPath = newPath.slice(2);
                                    currentInfoType = 'add';
                                }
                                else if (newPath === '/dev/null') {
                                    oldPath = oldPath.slice(2);
                                    currentInfoType = 'delete';
                                } else {
                                    currentInfoType = 'modify';
                                    oldPath = oldPath.slice(2);
                                    newPath = newPath.slice(2);
                                }

                                currentInfo.oldPath = oldPath;
                                currentInfo.newPath = newPath;
                                stat = STAT_HUNK;
                                break simiLoop;
                        }
                    }

                    currentInfo.type = currentInfoType || 'modify';
                }
                else if (line.indexOf('Binary') === 0) {
                    currentInfo.isBinary = true;
                    currentInfo.type = line.indexOf('/dev/null and') >= 0
                        ? 'add'
                        : (line.indexOf('and /dev/null') >= 0 ? 'delete' : 'modify');
                    stat = STAT_START;
                    currentInfo = null;
                }
                else if (stat === STAT_HUNK) {
                    if (line.indexOf('@@') === 0) {
                        var match = /^@@\s+-([0-9]+)(,([0-9]+))?\s+\+([0-9]+)(,([0-9]+))?/.exec(line)
                        currentHunk = {
                            content: line,
                            oldStart: match[1] - 0,
                            newStart: match[4] - 0,
                            oldLines: match[3] - 0 || 1,
                            newLines: match[6] - 0 || 1,
                            changes: []
                        };

                        currentInfo.hunks.push(currentHunk);
                        changeOldLine = currentHunk.oldStart;
                        changeNewLine = currentHunk.newStart;
                    }
                    else {
                        var typeChar = line.slice(0, 1);
                        var change = {
                            content: line.slice(1)
                        };

                        switch (typeChar) {
                            case '+':
                                change.type = 'insert';
                                change.isInsert = true;
                                change.lineNumber = changeNewLine;
                                changeNewLine++;
                                break;

                            case '-':
                                change.type = 'delete';
                                change.isDelete = true;
                                change.lineNumber = changeOldLine;
                                changeOldLine++;
                                break;

                            case ' ':
                                change.type = 'normal';
                                change.isNormal = true;
                                change.oldLineNumber = changeOldLine;
                                change.newLineNumber = changeNewLine;
                                changeOldLine++;
                                changeNewLine++;
                                break;

                            case '\\': // Seems "no newline" is the only case starting with /
                                var lastChange = currentHunk.changes[currentHunk.changes.length - 1];
                                if (!lastChange.isDelete) {
                                    currentInfo.newEndingNewLine = false;
                                }
                                if (!lastChange.isInsert) {
                                    currentInfo.oldEndingNewLine = false;
                                }
                        }

                        change.type && currentHunk.changes.push(change);
                    }
                }

                i++;
            }

            return infos;
        }
    };

    if (typeof exports === 'object' && typeof module === 'object') {
        // For CommonJS
        exports = module.exports = parser;
    }
    else if (typeof define === 'function' && define.amd) {
        // For AMD
        define('gitDiffParser', [], parser);
    }
    else {
        root.gitDiffParser = parser;
    }
})(this);