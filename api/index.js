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
			

			//function puts(error, stdout, stderr) { sys.puts(stdout) }
			//exec("ls -la", puts);
			//function execute (command, callback) {
			//	exec(command, function(error, stdout, stderr){ callback(stdout); });
				child = exec("ps faxu", function (error, stdout, stderr) {
				var result = shellParser(stdout);
				reply(result);
  		//	sys.print('stdout: ' + stdout);
  		//	sys.print('stderr: ' + stderr);
  				//if (error !== null) {
					//	console.log('exec error: ' + error);
					//}
				});	
			//}
			
		

//child.kill("SIGKILL")

			//execFile("ls", ["-lF", "/usr"], null, function (err, stdout, stderr) {
  		//	console.log("execFileSTDOUT:", JSON.stringify(stdout))
  		//	console.log("execFileSTDERR:", JSON.stringify(stderr))
			//})
    }
});

server.route({
    method: 'POST',
    path: '/delete/{pid}',
    handler: function (request, reply) {

			console.log(request.params);
		}
});

server.route({
    method: 'POST',
    path: '/reprioritize/{pid}',
    handler: function (request, reply) {

			console.log(request.params);
	}
});

server.start(function() {
    console.log('Server running at: ', server.info.uri);
});
