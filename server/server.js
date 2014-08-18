var static = require('node-static'),
	http = require('http'),
	file = new(static.Server)(),
	app = http.createServer(function (req, res) {
		file.serve(req, res);
	}).listen(8080),
	io = require('socket.io').listen(app).set('log level', 1),
	fs = require('fs'),
	swarm = require('./swarm.js');

function handler (req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection', function (socket) {
	var address = socket.handshake.address;
	
	console.log("Client connected from " + address.address + ":" + address.port);

	socket.on('addPeer', function () {
		console.log("addPeer emited: Adding peer id " + socket.id);
		swarm.addPeer(socket.id, address);
	});

	//fuk dis
	// socket.on('getSwarmList', function () {
	// 	console.log("Sending swarm list to " + socket.id);
	// 	io.sockets.socket(socket.id).emit('swarmList', swarm.getSwarmList());
	// });

	socket.on('connectInSwarm', function (data) {
		console.log("Entering swarm with mpd: " + data.mpd);
		swarm.connectInSwarm(socket.id, data.mpd);
	});

	socket.on('getPeerList', function (data) {
		console.log("Sending peer list to " + socket.id);
		io.sockets.socket(socket.id).emit('peerList', swarm.getPeerList(data.mpd));
	});

	socket.on('getPeerInfo', function (data) {
		console.log("Getting data from " + data.userId);
	});

	socket.on('getInList', function (userId) {
		Users.push({ 'userID': userId.myId });
		console.log("Total Users: " +  count);
		console.log("Users Lenght: " +  Users.length);

		for(var i = 0; i < Users.length; i++)
		{
			console.log(JSON.stringify(Users[i]));
		}
	});

	socket.on('disconnect', function () {
		console.log("Disconnect emmited by " + socket.id);
		swarm.removePeer(socket.id);
	});
});
