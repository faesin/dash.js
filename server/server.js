var static = require('node-static'),
	http = require('http'),
	file = new(static.Server)(),
	app = http.createServer(function (req, res) {
		file.serve(req, res);
	}).listen(8080),
	io = require('socket.io').listen(app),
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

var numSwarms = 0,
	numPeers = 0;

io.sockets.on('connection', function (socket) {
	var addedPeer = false;
	var address = socket.handshake.address;
	
	console.log("Client connected from " + address.address + ":" + address.port);

	socket.on('addPeer', function (data) {
		console.log("addPeer emited: Adding peer id " + socket.id);
		//Peers[data.userId] = socket.id;
		//Peers[data.userId].address = address.address;
		//Peers[data.userId].port = address.port;
		swarm.addPeer(data.mpd, socket.id, address);
		++numPeers;
		addedPeer = true;
	});

	socket.on('getSwarmList', function (data) {

	});

	socket.on('getPeerList', function (data) {
		console.log("Sending peer list to " + data.userId);
		io.sockets.socket(Peers[data.userId].socket).emit("peer-list", Peers);
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
		// if(addedPeer)
		// {
		// 	delete Peers[socket.userId];
		// 	--numPeers;
		// }
	});
});
