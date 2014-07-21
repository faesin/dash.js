Swarm = function (mpd) {

	this.mpdName = mpd;
	this.addedPeer = false;
	this.peerList = [];
};

Swarm.prototype.initializeSwarm = function (mpd) {
	// this.mpdName = mpd;
	
	var swarm = new Object();
	swarm.mpdName = mpd;

	console.log(JSON.stringify(swarmList));

	//swarmList.
};

Swarm.prototype.addPeerList = function(userId, address) {
	this.peerList[userId].userId = userId;
	this.peerList[userId].ipAddr = address.address;
	this.peerList[userId].port = address.port;
	this.addedPeer = true;
};

Swarm.prototype.removePeerList = function(userId) {
	if(this.addedPeer)
	{
		delete this.peerList[userId];
	}
};


module.exports.Swarm = Swarm;
module.exports.initializeSwarm = Swarm.initializeSwarm;
module.exports.addPeerList = Swarm.addPeerList;
module.exports.removePeerList = Swarm.removePeerList;