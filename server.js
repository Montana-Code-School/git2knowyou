var http = require('http');
var path = require('path');
var fs = require('fs');
http.createServer(function(req, res){
	console.log(`received a ${req.method} request at ${req.url}`);
	var filePath = path.resolve(`./public${req.url}`);
	fs.exists(filePath, function (exists){
		if (exists) {
			res.writeHead(200,{'Content-Type': 'text/html'});
			fs.createReadStream(filePath).pipe(res);
		} else {
			res.writeHead(404,{'Content-Type': 'text/html'});
			res.end('<html><head></head><body>Does Not Exist</body></html>');
		}
	});
	res.writeHead(200,{'Content-Type': 'text/html'});
	fs.createReadStream(filePath).pipe(res);
}) .listen(1337, '127.0.0.1');

console.log('Server running')