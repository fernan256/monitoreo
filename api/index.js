var Hapi = require('hapi');

var server = new Hapi.Server();
var sys = require('sys')
var exec = require('child_process').exec;
var child;

server.connection({
    host: 'localhost',
    port: '8000'
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

			//function puts(error, stdout, stderr) { sys.puts(stdout) }
			//exec("ls -la", puts);
			child = exec("ps faxu", function (error, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				reply(stdout);
  			sys.print('stdout: ' + stdout);
  			sys.print('stderr: ' + stderr);
  			if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
    }
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});
