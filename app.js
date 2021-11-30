const http = require('http'); //libreria de http
const fs = require('fs'); //libreria de file system


console.log("Servidor ejecutandose...");


http.createServer((request, response) => {
  console.log(request.url);
  const file = request.url == '/' ? "./WWW/index.html" : `./${request.url}`;

  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });
      response.write("No found data");
      response.end();
    }
  });


}).listen(8888);
