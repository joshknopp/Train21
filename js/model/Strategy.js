if(angular !== undefined && typeof angular.module === 'function') {
	angular.module('BlackjackTrainerApp.model.Strategy', []);
}

var S = "S",
	H = "H",
	R = "R",
	P = "P",
	Dh = "Dh",
	Ds = "Ds",
	Rh = "Rh",
	SRh = "S/Rh",
	HRh = "H/Rh",
	HDh = "H/Dh",
	SDs = "S/Ds",
	PRp = "P/Rp";
var DEALER_CARDS =	[2,	3,	4,	5,	6,	7,	8,	9,	10,	1];
var PLAYER_CARDS = [
	{hand: "H17",	strategy: [S,	S,	S,	S,	S,	S,	S,	S,	S,	SRh]},
	{hand: "H16",	strategy: [S,	S,	S,	S,	S,	H,	H,	Rh,	Rh,	Rh]},
	{hand: "H15",	strategy: [S,	S,	S,	S,	S,	H,	H,	H,	Rh,	HRh]},
	{hand: "H14",	strategy: [S,	S,	S,	S,	S,	H,	H,	H,	H,	H]},
	{hand: "H13",	strategy: [S,	S,	S,	S,	S,	H,	H,	H,	H,	H]},
	{hand: "H12",	strategy: [H,	H,	S,	S,	S,	H,	H,	H,	H,	H]},
	{hand: "H11",	strategy: [Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	HDh]},
	{hand: "H10",	strategy: [Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	H,	H]},
	{hand: "H09",	strategy: [H,	Dh,	Dh,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "H08",	strategy: [H,	H,	H,	H,	H,	H,	H,	H,	H,	H]},
	{hand: "S19",	strategy: [S,	S,	S,	S,	SDs,S,	S,	S,	S,	S]},
	{hand: "S18",	strategy: [SDs,	Ds,	Ds,	Ds,	Ds,	S,	S,	H,	H,	H]},
	{hand: "S17",	strategy: [H,	Dh,	Dh,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "S16",	strategy: [H,	H,	Dh,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "S15",	strategy: [H,	H,	Dh,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "S14",	strategy: [H,	H,	H,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "S13",	strategy: [H,	H,	H,	Dh,	Dh,	H,	H,	H,	H,	H]},
	{hand: "P01",	strategy: [P,	P,	P,	P,	P,	P,	P,	P,	P,	P]},
	{hand: "P10",	strategy: [S,	S,	S,	S,	S,	S,	S,	S,	S,	S]},
	{hand: "P09",	strategy: [P,	P,	P,	P,	P,	S,	P,	P,	S,	S]},
	{hand: "P08",	strategy: [P,	P,	P,	P,	P,	P,	P,	P,	P,	PRp]},
	{hand: "P07",	strategy: [P,	P,	P,	P,	P,	P,	H,	H,	H,	H]},
	{hand: "P06",	strategy: [P,	P,	P,	P,	P,	H,	H,	H,	H,	H]},
	{hand: "P05",	strategy: [Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	Dh,	H,	H]},
	{hand: "P04",	strategy: [H,	H,	H,	P,	P,	H,	H,	H,	H,	H]},
	{hand: "P03",	strategy: [P,	P,	P,	P,	P,	P,	H,	H,	H,	H]},
	{hand: "P02",	strategy: [P,	P,	P,	P,	P,	P,	H,	H,	H,	H]}
];

function getTable(player1, player2, dealer) {
	// TODO Add some veriety to 10s (10, J, Q, K)
	var playerHand = new Hand([new Card(player1), new Card(player2)]);
	var dealerHand = new Hand([new Card(null, null, true), new Card(dealer)]);
	return new Table(dealerHand, playerHand);
}

function expand(value) {
	if(value == 10) {
		value = 10 + Math.floor(Math.random() * 4);
	}
	return value;
}

var Strategy = function() {
	var dealerIndex = Math.floor(Math.random() * DEALER_CARDS.length);
	var dealerCard = DEALER_CARDS[dealerIndex];
	var playerScenario = PLAYER_CARDS[Math.floor(Math.random() * PLAYER_CARDS.length)];
	var playerHandKey = playerScenario.hand;
	var playerStrategy = playerScenario.strategy[dealerIndex];
	
	var playerHandType = playerHandKey.substring(0, 1);
	var playerHandValue = parseInt(playerHandKey.substring(1));
	
	var playerCard1 = null, playerCard2 = null;
	
	switch(playerHandType) {
		case "P":
			playerCard1 = playerCard2 = playerHandValue;
			break;
		case "S":
			playerCard1 = 1;
			playerCard2 = playerHandValue - 11;
			break;
		case "H":
			var min, max;
			switch(playerHandValue) {
				case  8:	min = 2; max = 6;	break;
				case  9:	min = 2; max = 7;	break;
				case 10:	min = 2; max = 8;	break;
				case 11:	min = 2; max = 9;	break;
				case 12:	min = 2; max = 10;	break;
				case 13:	min = 3; max = 10;	break;
				case 14:	min = 4; max = 10;	break;
				case 15:	min = 5; max = 10;	break;
				case 16:	min = 6; max = 10;	break;
				case 17:	min = 7; max = 10;	break;
			}
			playerCard1 = min + Math.floor(Math.random(max + 1 - min));
			playerCard2 = playerHandValue - playerCard1;
			break;
	}

	this.table = getTable(expand(playerCard1), expand(playerCard2), expand(dealerCard));
	this.strategy = playerStrategy;
	this.isVisibleStrategy = false;
};

this.exports = Strategy;
