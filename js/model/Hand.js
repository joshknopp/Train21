if(angular !== undefined && typeof angular.module === 'function') {
	angular.module('BlackjackTrainerApp.model.Hand', []);
}

var Hand = function(cards) {
	// Randomize unassigned params
	if(!(cards instanceof Array)) {
		cards = [new Card(), new Card()];
	}
	// TODO Validate data... if(!isCard) ...
	// Set internal properties
	this.cards = cards;
};

this.exports = Hand;
