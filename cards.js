// Let's play cards

function Card (numericalValue, suit) {
  this.numericalValue = numericalValue;
  this.suit = suit;
  if(numericalValue < 11){
    this.faceValue = numericalValue;
  } else {
    //var faceCards = { jack: 11, queen: 12, king: 13, ace: 14 };
    var faceCards = { 11: "Jack", 12: "Queen", 13: "King", 14: "Ace" };
    this.faceValue = faceCards[numericalValue];
  }
}
// I'd like to display these cards like so:
// "king of diamonds" or "3 of clubs"

Card.prototype.display = function(){
  return `${this.faceValue} of ${this.suit}`
}

// I'd like to be able to compare two cards
// kingOfDiamonds.beats(threeOfClubs) // true
// threeOfClubs.beats(kingOfDiamonds) // false

Card.prototype.beats = function(otherCard){
  return this.numericalValue > otherCard.numericalValue
}

Card.prototype.differs = function(otherCard) {
return this.numericalValue !== otherCard.numericalValue
}

Card.prototype.ties = function(otherCard) {
return this.numericalValue === otherCard.numericalValue
}

Card.prototype.beatstwo = function(otherCard){
  return this.numericalValue > otherCard.numericalValue
}

var myCard = { value: "queen", suit: "hearts"};
var otherCard = { value: 4, suit: "clubs"};

// casino war: if my card beats yours, I win; if yours beats mine, you win;
// five 52 card decks;
// if the two cards are identical, each player draws 3 more and compare the last
// little kid war: if my card beats yours, I win; if yours beats mine, you win;
// winner gets both cards;
// suits don't matter; one 52 card deck;
// if the two cards are identical, each player draws 3 more and compare the last //
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

function Player(name, cards){
  this.name = name;
  this.hand = cards;
}
Player.prototype.presentCard = function(){
  // should return the first card
  // in the player's hand
  return this.hand.shift();
}

Player.prototype.presentBattleCard = function(){
  // should return the first card
  // in the player's hand
  return this.hand.shift();
}

Player.prototype.presentTwoCards = function(){
  // should return three cards
  // in the player's hand
  return this.hand.splice(0, 2);
}

Player.prototype.take = function(cardOne, cardTwo){
  this.hand.push(cardOne);
  this.hand.push(cardTwo);
}
// want to compare the players' cards, one by one
function Game(playerOne, playerTwo){
  var deck = new Deck();
  var firstHand = deck.cards.splice(0, 26);
  var secondHand = deck.cards;
  this.players = [ new Player(playerOne, firstHand),
                   new Player(playerTwo, secondHand)];
  this.playerOne = this.players[0];
  this.playerTwo = this.players[1];
}
// assuming each player has at least one card

// Game.prototype.battle = function(){
//
// // each player presents a card
//   var firstPlayersCard = this.playerOne.presentCard();
//   console.log(firstPlayersCard);
//   var secondPlayersCard = this.playerTwo.presentCard();
//   console.log(secondPlayersCard);
// //and whoever's card has the higher value
//   if(firstPlayersCard.beats(secondPlayersCard)){
//     console.log(`${this.playerOne.name} wins the battle!`);
// // puts both cards at the bottom of the winner's hand
//     this.playerOne.take(firstPlayersCard, secondPlayersCard);
//   } else {
//     console.log(`${this.playerTwo.name} wins the battle!`);
//     this.playerTwo.take(firstPlayersCard, secondPlayersCard);
//   }
//   console.log(this.status())
//
//   this.checkForWinner()
// }

Game.prototype.battle = function(){

// each player presents a card
  var firstPlayersCard = this.playerOne.presentCard();
  console.log(firstPlayersCard);
  var secondPlayersCard = this.playerTwo.presentCard();
  console.log(secondPlayersCard);
//and whoever's card has the higher value
  if (firstPlayersCard.differs(secondPlayersCard)) {
    if(firstPlayersCard.beats(secondPlayersCard)){
      console.log(`${this.playerOne.name} wins the battle!`);
  // puts both cards at the bottom of the winner's hand
      this.playerOne.take(firstPlayersCard, secondPlayersCard);
    } else {
      console.log(`${this.playerTwo.name} wins the battle!`);
      this.playerTwo.take(firstPlayersCard, secondPlayersCard);
    }
    console.log(this.status())
  } else if (firstPlayersCard.ties(secondPlayersCard)) {
        console.log(firstPlayersCard);
        console.log(secondPlayersCard);
        console.log("It's a tie!");
    var firstPlayersTwoCards = this.playerOne.presentTwoCards();
    console.log(firstPlayersTwoCards);
    var secondPlayersTwoCards = this.playerTwo.presentTwoCards();
    console.log(secondPlayersTwoCards);

    var firstPlayersBattleCard = this.playerOne.presentBattleCard();
    console.log(firstPlayersBattleCard);
    var secondPlayersBattleCard = this.playerTwo.presentBattleCard();
    console.log(secondPlayersBattleCard);

    var cardsWon =  [firstPlayersTwoCards, firstPlayersBattleCard,
                    secondPlayersTwoCards, secondPlayersBattleCard,
                    firstPlayersCard, secondPlayersCard];

    if(firstPlayersBattleCard.beatstwo(secondPlayersBattleCard)){
      console.log(`${this.playerOne.name} wins the battle!`);
  // puts both cards at the bottom of the winner's hand
      this.playerOne.take(cardsWon);
    } else {
      console.log(`${this.playerTwo.name} wins the battle!`);
      this.playerTwo.take(cardsWon);
    }
        console.log(this.status())
  }
  this.checkForWinner()
}

Game.prototype.checkForWinner = function(){
  if(this.playerOne.hand.length < 10){
    this.winner = this.playerTwo
  } else if(this.playerTwo.hand.length < 10){
    this.winner = this.playerOne
  }
  if(this.winner){
    console.log(`Game over! ${this.winner.name} wins!`);
    this.over = true;
  }
}
// status shows how many cards each person has
Game.prototype.status = function(){
  return `${this.playerOne.name} has ${this.playerOne.hand.length} cards remaining;
  ${this.playerTwo.name} has ${this.playerTwo.hand.length} cards`
}
// var game = new Game("Ed", "Lake");
// while(!game.over){
//   game.battle();
// }
