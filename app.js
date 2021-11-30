const http = require('http'); //libreria de http
const fs = require('fs'); //libreria de file system
const path=require('path');
  

console.log("Servidor ejecutandose...");
http.createServer((req, res) => {

  console.log(`${req.method} solicita ${req.url}`);

  if(req.url =='/'){
    fs.readFile('./WWW/index.html', 'UTF-8',(err,html)=>{
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(html);
      });
      }else if(req.url.match(/.css$/)){
          const reqPath=path.join(__dirname,'WWW',req.url);
          const fileStream=fs.createReadStream(reqPath,'UTF-8');
          res.writeHead(200 ,{'Content-Type':'text/css'});
          fileStream.pipe(res);
          
        }else if(req.url.match(/.png$/)){
          const reqPath=path.join(__dirname,'WWW',req.url);
          const fileStream=fs.createReadStream(reqPath);
          res.writeHead(200 ,{'Content-Type':'text/png'});
          fileStream.pipe(res);


        }else if(req.url.match(/.jpg$/)){
          const reqPath=path.join(__dirname,'WWW',req.url);
          const fileStream=fs.createReadStream(reqPath);
          res.writeHead(200 ,{'Content-Type':'text/jpg'});
          fileStream.pipe(res);
        }else if (req.url.match(/.js$/)){
          const reqPath=path.join(__dirname,'WWW',req.url);
          const fileStream=fs.createReadStream(reqPath);
          res.writeHead(200 ,{'Content-Type':'text/js'});
          fileStream.pipe(res);
        }
        else {
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Server Error');

      }


}).listen(8888);

