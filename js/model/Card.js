if(angular !== undefined && typeof angular.module === 'function') {
	angular.module('BlackjackTrainerApp.model.Card', ['BlackjackTrainerApp.model.SUIT']);
}

var Card = function(value, suit, isFaceDown) {
	// Ensure we are working with int inputs
	value = parseInt(value);
	suit = parseInt(suit);
	// Randomize unassigned params
	if(isNaN(value)) {
		value = Math.ceil(Math.random() * 13);
	}
	if(isNaN(suit)) {
		suit = Math.floor(Math.random() * 4);
	}
	// Validate data
	if(value < 1 || value > 13) {
		throw("Card: Invalid value=" + value);
	} else if(suit < 0 || suit > 3) {
		throw("Card: Invalid suit=" + suit);
	}
	// Set internal properties
	this.value = value;
	this.suit = suit;
	this.isFaceDown = (isFaceDown === true);
};

// TODO Should live in the view?
Card.prototype.getValueAsString = function() {
	var result = "ERR";
	if(this.isFaceDown) {
		result = "X";
	} else {
		switch(this.value) {
			case 1:		result = "A";	break;
			case 2:		result = "2";	break;
			case 3:		result = "3";	break;
			case 4:		result = "4";	break;
			case 5:		result = "5";	break;
			case 6:		result = "6";	break;
			case 7:		result = "7";	break;
			case 8:		result = "8";	break;
			case 9:		result = "9";	break;
			case 10:	result = "10";	break;
			case 11:	result = "J";	break;
			case 12:	result = "Q";	break;
			case 13:	result = "K";	break;
		}
	}
	return result;
};

Card.prototype.getSuitAsString = function() {
	var result = "ERR";
	if(this.isFaceDown) {
		result = "XXXXX";
	} else {
		switch(this.suit) {
			case SUIT.SPADES:	result = "Spades";		break;
			case SUIT.DIAMONDS:	result = "Diamonds";	break;
			case SUIT.CLUBS:	result = "Clubs";		break;
			case SUIT.HEARTS:	result = "Hearts";		break;
		}
	}
	return result;
};

Card.prototype.getSuitAsSymbol = function() {
	var result = "ERR";
	if(this.isFaceDown) {
		result = "X";
	} else {
		switch(this.suit) {
			case SUIT.SPADES:	result = "♠";	break;
			case SUIT.DIAMONDS:	result = "♦";	break;
			case SUIT.CLUBS:	result = "♣";	break;
			case SUIT.HEARTS:	result = "♥";	break;
		}
	}
	return result;
};

this.exports = Card;

