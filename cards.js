// Let's play cards

var Card = function(numericalValue, suit) {
  this.numericalValue = numericalValue;
  this.suit = suit;
  if(numericalValue < 11){
    this.faceValue = numericalValue;
  } else {
    var faceCards = { 11: "Jack", 12: "Queen", 13: "King", 14: "Ace" };
    this.faceValue = faceCards[numericalValue];
  }
}
var kingOfDiamonds = new Card("diamonds", "king");
var threeOfClubs = new Card("clubs", 3);

// I'd like to display these cards like so:
// "king of diamonds" or "3 of clubs"

Card.prototype.display = function(){
  return `${this.value} of ${this.suit}`
}

// I'd like to be able to compare two cards
// kingOfDiamonds.beats(threeOfClubs) // true
// threeOfClubs.beats(kingOfDiamonds) // false

Card.prototype.beats = function(otherCard){
  if(this.numericalValue === otherCard.numericalValue){
    // spades is 4, hearts is 3, diamonds is 2, clubs is 1
    var suitValues = { spades: 4, hearts: 3, diamonds: 2, clubs: 1 };
    return suitValues[this.suit] > suitValues[otherCard.suit]
  } else {
    return this.numericalValue > otherCard.numericalValue
  }
}

var myCard = { value: "queen", suit: "hearts"};
var otherCard = { value: 4, suit: "clubs"};

function Deck(){
  this.cards = [];
  for(var val = 2; val <= 14; val++){
    ["clubs", "diamonds", "hearts", "spades"].forEach(
      (suit) => this.cards.push(new Card(val, suit))
    );
  }
  function shuffle(cards) {
      var j, x, i;
      for (i = cards.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = cards[i - 1];
          cards[i - 1] = cards[j];
          cards[j] = x;
      }
  }
  shuffle(this.cards);
}

var deck = new Deck();

function Player(name, cards) {
  this.name = name;
  this.hand = cards;
}
Player.prototype.presentCard = function(){
  return this.hand.shift();
}
Player.prototype.take = function(cardOne, cardTwo){
  this.hand.push(cardOne);
  this.hand.push(cardTwo);
}

var hand = deck.cards.splice(0, 26);

function Game(){
  this.deck = new Deck();
  var firstHand = deck.cards.splice(0, 26);
  var secondHand = deck.cards;
  this.players = [new Player(playerOne, firstHand),
                  new Player(playerTwo, secondHand)];
}

Game.prototype.battle = function(){
  var firstPlayersCard = this.playerOne.presentCard();
  var secondPlayersCard = this.playerTwo.presentCard();

  if(firstPlayersCard.beats(secondPlayersCard)) {
    this.playerOne.take(firstPlayersCard, secondPlayersCard)
  } else {
    this.playerTwo.take(firstPlayersCard, secondPlayersCard)
  }
  console.log(this.status())
  this.checkForWinner()
}
Game.prototype.checkForWinner = function(){
  if(this.playerOne.hand.length === 0){
    this.winner = this.playerTwo
  } else if(this.playerTwo.hand.length === 0) {
    this.winner - this.playerOne
  }
  if(this.winner){
    console.log(`Game over! ${this.winner.name} wins!`);

  }
}
Game.prototype.status = function() {
  return `${this.playerOne.name} has
  ${this.playerOne.hand.length} cards remaining;
  ${this.playerTwo.name} has
  ${this.playerTwo.hand.length} cards remaining;
  `
}

var game = new Game("Ed", "Lake");
while(!game.over){
  game.battle();
}
