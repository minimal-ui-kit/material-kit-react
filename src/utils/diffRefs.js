// crc32b hashing
// from https://stackoverflow.com/questions/18638900/javascript-crc32/50579690#50579690
const crc32 = function(r){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0}; // eslint-disable-line

const crc32hex = function(x){return crc32(x).toString(16);}

/*
Concept: 
 - for insert and delete lines we always use the corresponding left or right file where they appear
 - for normal lines we use the right file and the left file gets the negated hexa of the same line
 - for placeholder lines the same holds, they get the negated hexa of the line they correspond to on the other side
 - result: its always easy to find the corresponding line on the other side unless its in a changed block
*/
const hashLine = function(onLeft,filePath,fileRevision,lineNumber){
    const temp = `${onLeft?"left":"right"}${filePath}${fileRevision}${lineNumber.toString()}`
    return crc32hex(temp)
}

const hashHunkSeparator = function(onLeft,filePath,fileRevision,hunkContent){
    const temp = `${onLeft?"left":"right"}${filePath}${fileRevision}${hunkContent}`
    return crc32hex(temp)
}

const hashFileHeader = function(onLeft,filePath,fileRevision){
    const temp = `${onLeft?"left":"right"}${filePath}${fileRevision}`
    return crc32hex(temp)
}


const inverse = {
    0: "f",
    1: "e",
    2: "d",
    3: "c",
    4: "b",
    5: "a",
    6: "9",
    7: "8",
    8: "7",
    9: "6",
    a: "5",
    b: "4",
    c: "3",
    d: "2",
    e: "1",
    f: "0",
}
const invertHex = function(hex){
    return [...hex].map(digit => inverse[digit]).join("")
}

export { hashLine, hashHunkSeparator, hashFileHeader, invertHex, crc32hex };