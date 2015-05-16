if(angular !== undefined && typeof angular.module === 'function') {
	angular.module('BlackjackTrainerApp.model.SUIT', []);
}

var SUIT = {
	SPADES:		0,
	DIAMONDS:	1,
	CLUBS:		2,
	HEARTS:		3
};

this.exports = SUIT;
