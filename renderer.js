var fs = require('fs');

function mergeValues(values, content){
  // cycle over keys
  for (var key in values){
    // replace {{key}} with value from object
    content = content.replace('{{' + key + '}}', values[key]);
  }
  //return merged content
  return content;
}

function view(templateName, values, response){

  // read from html templates
  var fileContents  = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
  // insert values into html
  fileContents = mergeValues(values, fileContents);
  //write out to resonse
  response.write(fileContents);
}

module.exports.view = view;
