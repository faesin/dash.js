var Swarm = function() {

	var swarmId,
		mpdName,
		addedPeer = false,
		swarmList = [],
		peerList = [],

	initializeSwarm = function (mpd) {
		// this.mpdName = mpd;
		
		var swarm = new Object();
		swarm.mpdName = mpd;

		console.log(JSON.stringify(swarmList));

		//swarmList.

	},

	addPeerList = function(userId, address) {
		this.peerList[userId].userId = userId;
		this.peerList[userId].ipAddr = address.address;
		this.peerList[userId].port = address.port;

		this.addedPeer = true;
	},

	removePeerList = function(userId) {
		if(this.addedPeer)
		{
			delete this.peerList[userId];
		}
	}

};

module.exports.initializeSwarm = Swarm.initializeSwarm;
module.exports.addPeerList = Swarm.addPeerList;
module.exports.removePeerList = Swarm.removePeerList;