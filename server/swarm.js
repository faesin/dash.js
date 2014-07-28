var addedPeer = false,
	SwarmList = [];

// Swarms
module.exports.initializeSwarm = function initializeSwarm (mpd) {
	var swarm = new Object();
	swarm.mpdName = mpd;

	console.log(JSON.stringify(swarmList));
};

function getSwarmByMpd(mpd) {
	for (var i = SwarmList.length - 1; i >= 0; i--)
		if(SwarmList[i].mpd == mpd)
			return SwarmList[i];

	return null;
}

module.exports.addPeer = function addPeer (mpd, userId, address) {
	console.log("addPeer emited: Adding peer to " + mpd  
				+ " id: " + userId + " address: " + JSON.stringify(address));

	var swarm = getSwarmByMpd(mpd);
	if(swarm != null)
	{
		console.log("ADD TO EXISTING SWARM");
	}else{
		swarm = new Object();
		swarm.mpd = mpd;
		swarm.peerList = [];

		var nPeer = new Object();
		nPeer.id = userId;
		nPeer.address = address;

		swarm.peerList.push(nPeer);
		SwarmList.push(swarm);

		console.log(JSON.stringify(swarm));
	}

	addedPeer = true;
};

module.exports.yolo = function yolo () {
	console.log("####YOLOSWAG####");
}

// Swarm.prototype.removePeerList = function(userId) {
// 	if(this.addedPeer)
// 	{
// 		delete this.peerList[userId];
// 	}
// };

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
