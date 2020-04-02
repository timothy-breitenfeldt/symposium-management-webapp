var JavadocToMarkdown = require("./javadoc-to-markdown.js");
var MarkdownToHtml = require("./javadoc-to-markdown.js");

var fs = require('fs');

function fileRecursor(path){
    fs.readdir(path,function(err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach( function (file) {
            let possiblePath = path + "/" + file;
            if(fs.statSync(possiblePath).isDirectory())
            {
                fileRecursor(possiblePath);
            }
            else{
                if(file.endsWith(".php") || file.endsWith(".js")){
                    let markdownConverter = new JavadocToMarkdown(file);
                    var data = fs.readFileSync(possiblePath, 'utf8');
                    if(file.endsWith(".php")){
                        var convertedData = (markdownConverter.fromPHPDoc(data, 2));
                        fs.writeFile("./markdown phpDoc/" + file.substr(0, file.length - 3) + "md", convertedData, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });

                    }
                    else{

                        var convertedData = (markdownConverter.fromJSDoc(data, 2));
                        fs.writeFile("./markdown jsDoc/" + file.substr(0, file.length - 2) + "md", convertedData, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });
                        
                    }

                    console.log("File: " + possiblePath + " was created and written with converted markdown");
                }
            }
        });
    });
}

/*
function fileRecursor(path){
    var md = new Markdown();
md.bufmax = 2048;
var fileName = 'test/test.md';
var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};

// Write a header.
console.log('===============================');
// Write a trailer at eof.
md.once('end', function() {
  console.log('===============================');
});
md.render(fileName, opts, function(err) {
  if (err) {
    console.error('>>>' + err);
    process.exit();
  }
  md.pipe(process.stdout);
});
}
*/

fileRecursor("./../../");