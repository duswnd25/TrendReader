exports.isNewData = function(input, rootCallback){
    let path = './log/' + input + '.txt';
    const fs = require("fs");
    
   fs.exists(path, function (exists) {
       console.log(exists ? "it's there" : "no exists!");
   });
};