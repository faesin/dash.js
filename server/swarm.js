var addedPeer = false,
	swarmList = [];
	peerList = [];

// ----------------------------------------------
// ------------------- Swarms -------------------
// ----------------------------------------------

function addSwarm (mpd) {
	var swarm = new Object();
	swarm.mpd = mpd;
	swarm.peers = [];

	swarmList.push(swarm);
	//console.log(JSON.stringify(swarmList));
};

function getSwarmByMpd(mpd) {
	for (var i = swarmList.length - 1; i >= 0; i--)
		if(swarmList[i].mpd == mpd)
			return swarmList[i];
	return null;
};

module.exports.getSwarmList = function getSwarmList () {
	return swarmList;
};

// ----------------------------------------------
// ------------------- Peers -------------------
// ----------------------------------------------

module.exports.addPeer = function addPeer (userId, address) {
	console.log("addPeer id: " + userId + " address: " + JSON.stringify(address));

	var peer = new Object();
	peer.id = userId;
	peer.address = address;
	peer.swarms = [];

	peerList.push(peer)

	addedPeer = true;
};

function arrayObjectIndexOf(array, searchTerm, property) {
	for(var i = 0, len = array.length; i < len; ++i)
		if(array[i][property] === searchTerm) return i;
	return -1;
};

module.exports.connectInSwarm = function getInSwarm (userId, mpd) {
	var i = arrayObjectIndexOf(peerList, userId, "id"),
		j = arrayObjectIndexOf(swarmList, mpd, "mpd");

	if(j == -1)
	{
		addSwarm(mpd);
		j = swarmList.length - 1;
	}

	peerList[i].swarms.push(j);
	swarmList[j].peers.push(userId);


	console.log(JSON.stringify(swarmList));
};

module.exports.removePeer = function removePeer (userId) {
	var i = arrayObjectIndexOf(peerList, userId, "id");

	if(i != -1)
		peerList.splice(i, 1);
	else
		console.log("Something bad happened");
};

module.exports.getPeerList = function getPeerList (mpd) {
	var i = arrayObjectIndexOf(swarmList, mpd, "mpd");
	return swarmList[i].peers;
};

module.exports.removePeer = function removePeer(userId) {
	if(peerList.length > 0)
	{
		console.log("Removing from swarms");
		var i = arrayObjectIndexOf(peerList, userId, "id");

		for(var j = 0, len = peerList[i].swarms.length; j < len; ++j)
			for(var k = 0, len2 = swarmList[peerList[i].swarms[j]].peers.length; k < len2; ++k)
				if(swarmList[peerList[i].swarms[j]].peers[k] === userId)
					swarmList[peerList[i].swarms[j]].peers.splice(k, 1);

		peerList.splice(i, 1);

		console.log(JSON.stringify(peerList));
		console.log(JSON.stringify(swarmList));

	}
};

// SwarmList = function () {
// 	this.list = [];
// }

// SwarmList.prototype.addSwarmList = function (mpd) {
// 	var swarm = new Swarm(mpd);
// }

// SwarmList.prototype.removeSwarmList = function () {
	
// }

// SwarmList.prototype.getSwarm = function () {

// }
