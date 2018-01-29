const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 9000;
var htmlFile;
var cssFile;


fs.readFile(path.resolve(__dirname,"../html/index.html"), function(err, data){
  if(err){
    throw err;
  }
  htmlFile = data;
});

fs.readFile(path.resolve(__dirname,"../css/style.css"), function(err, data){
  if(err){
    throw err;
  }
  cssFile = data;
});

const server = http.createServer((req, res) => {
  switch(req.url){
    case "/style.css" :
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      res.write(cssFile);
      break;
    default :
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(htmlFile);
  }
  res.end();
});

server.listen(port,hostname, () => {
  console.log('Server running at http://'+hostname+':'+port+'/');
});
