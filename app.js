const http = require('http'); //libreria de http
const fs = require('fs'); //libreria de file system




console.log("Servidor ejecutandose...");


http.createServer((request, response) => {
  console.log(request.url);
  const file = request.url == '/' ? "./index.html" : `.${request.url}`;

  if (request.url == '/contactos.html') {
    let data = "Estado de contacto";
    fs.writeFile('./contacto.txt', data, (err) => {
      if (err) throw err;
      console.log("Su formulario fue enviado exitosamente")
    });

    /*
    
  if (request.method == 'POST') {
      console.log('algo algo')
      var body = '';

      request.on('data', function (data) {
          body += data;

          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
              request.connection.destroy();
      });

      request.on('end', function () {
          var post = qs.parse(body);
          // use post['blah'], etc.
      });
  }

    //*************************** */

  }


  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });
      response.write("Not Found MADAFAKA");
      response.end();
    } else {
      //si tenemos la cadena "hola.como estas" i hacemos un split de esta
      //manera "hola.como estas".split(','); va a devolver un arreglo con dos
      //pedazos: ["hola", "como estas"]. Si agregamos el .pop(): "como estas"
      const extension = file.split('.').pop();

      switch (extension) {
        case 'txt':
          response.writeHead(200, {
            "Content-Type": "text/plain"
          });
          break;

        case 'html':
          response.writeHead(200, {
            "Content-Type": "text/html"
          });
          break;

        case 'jpg':
          response.writeHead(200, {
            "Content-Type": "image/jpeg"
          });
          break;

        case 'png':
          response.writeHead(200, {
            "Content-Type": "image/png"
          });
          break;

        case 'css':
          response.writeHead(200, {
            "Content-Type": "text/css"
          });
          break;

        case 'js':
          response.writeHead(200, {
            "Content-Type": "text/javascript"
          });
          break;

        default:
          response.writeHead(200, {
            "Content-Type": "text/plain"
          });
      }

      response.write(data);
      response.end();
    }

  });


}).listen(8888);