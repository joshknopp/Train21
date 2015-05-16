if(angular !== undefined && typeof angular.module === 'function') {
	angular.module('BlackjackTrainerApp.model.Table', []);
}

var Table = function(dealerHand, playerHand) {
	// Randomize unassigned params
	if(dealerHand == null) {
		dealerHand = new Hand();
		//dealerHand.cards[1].isFaceDown = true;
	}
	if(playerHand == null) {
		playerHand = new Hand();
	}
	// TODO Validate data... if(!isHand) ...
	// Set internal properties
	this.dealerHand = dealerHand;
	this.playerHand = playerHand;
};

this.exports = Table;
