var Hapi = require('hapi');

var server = new Hapi.Server();
var sys = require('sys')
var exec = require('child_process').exec;
var shellParser = require('node-shell-parser');
var child;

server.connection({
    host: 'localhost',
    port: '8000'
});

server.route({
    method: 'GET',
    path: '/process',
    handler: function (request, reply) {
			
			child = exec("ps faxu", function (error, stdout, stderr) {
				var result = shellParser(stdout);
				reply(result);

			});
    }
});

server.route({
    method: 'POST',
    path: '/delete/{pid}',
    handler: function (request, reply) {

			console.log(request.params);
			process.on('SIGHUP', function() {
  			console.log('Got SIGHUP signal.');
			});

			setTimeout(function() {
  			console.log('Exiting.');
  			process.exit(0);
			}, 100);

			process.kill(process.pid, 'SIGHUP');
		}
});

server.route({
    method: 'POST',
    path: '/prioritize/{pid}',
    handler: function (request, reply) {
			
			console.log(request.params);
	}
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});
