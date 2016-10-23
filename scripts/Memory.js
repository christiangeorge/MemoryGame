
var CardBackUrl = "./images/CardBack.png";
var BlankCardUrl = "./images/BlankCard.png";
var GetCardUrl = function (Sign, Color) {
    return "./images/" + Sign + Color + "Card.png";
};

function randomizeArray(array) {
    //(Fisher-Yates) From https://bost.ocks.org/mike/shuffle/
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function shuffle(array) {
    

    return array;
}

var ReturnGameBoard = function (Cards, numPairs) {
    var returnValue = [];
    var tempCards = [];

    var totalCards = Cards.length;
    for (var i = 0; i < totalCards; i++) {
        tempCards.push(Cards[i]);
    }

    if (numPairs > totalCards) {
        numPairs = totalCards;
    }

    var count = 0;
    //while (tempCards.length > 0) {
    for (var i = 0; i < numPairs; i++) {
        var value;
        var randomInt1toLength = Math.floor(Math.random() * 1000) % tempCards.length;
        if (randomInt1toLength > -1 && randomInt1toLength <= tempCards.length) {
            value = tempCards[randomInt1toLength];
            tempCards.splice(randomInt1toLength, 1);
        } else {
            value = array.pop();
            this.log("ERROR: out of bounds");
        }
        //Push the card twice
        returnValue.push(ko.observable({ Id: ++count, Name: ko.observable(value.Name), CardBack: value.CardBack, CardImageUrl: value.CardImageUrl, Showing: ko.observable(value.Showing) }));
        returnValue.push(ko.observable({ Id: ++count, Name: ko.observable(value.Name), CardBack: value.CardBack, CardImageUrl: value.CardImageUrl, Showing: ko.observable(value.Showing) }));
    }

    returnValue = randomizeArray(returnValue);
    return returnValue;
};


var firstCardPick = {};

var Memory = {
    self: this,
    Description: "Simple Memory Game",
    isDebug: false,
    TestData: {
        Cards: [
            { Name: 'Circle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", ""), Showing: false },
            { Name: 'Plus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", ""), Showing: false },
            { Name: 'Square', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", ""), Showing: false },
            { Name: 'Star', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", ""), Showing: false },
            { Name: 'WavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", ""), Showing: false },            

            { Name: 'RedCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Red"), Showing: false },
            { Name: 'RedPlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Red"), Showing: false },
            { Name: 'RedSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Red"), Showing: false },
            { Name: 'RedStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Red"), Showing: false },
            { Name: 'RedWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Red"), Showing: false },

            { Name: 'BlueCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Blue"), Showing: false },
            { Name: 'BluePlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Blue"), Showing: false },
            { Name: 'BlueSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Blue"), Showing: false },
            { Name: 'BlueStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Blue"), Showing: false },
            { Name: 'BlueWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Blue"), Showing: false },

            { Name: 'GreenCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Green"), Showing: false },
            { Name: 'GreenPlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Green"), Showing: false },
            { Name: 'GreenSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Green"), Showing: false },
            { Name: 'GreenStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Green"), Showing: false },
            { Name: 'GreenWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Green"), Showing: false },

            { Name: 'YellowCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Yellow"), Showing: false },
            { Name: 'YellowPlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Yellow"), Showing: false },
            { Name: 'YellowSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Yellow"), Showing: false },
            { Name: 'YellowStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Yellow"), Showing: false },
            { Name: 'YellowWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Yellow"), Showing: false },

            { Name: 'CyanCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Cyan"), Showing: false },
            { Name: 'CyanPlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Cyan"), Showing: false },
            { Name: 'CyanSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Cyan"), Showing: false },
            { Name: 'CyanStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Cyan"), Showing: false },
            { Name: 'CyanWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Cyan"), Showing: false },

            { Name: 'MagentaCircle', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Circle", "Magenta"), Showing: false },
            { Name: 'MagentaPlus', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Plus", "Magenta"), Showing: false },
            { Name: 'MagentaSquare', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Square", "Magenta"), Showing: false },
            { Name: 'MagentaStar', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("Star", "Magenta"), Showing: false },
            { Name: 'MagentaWavyLines', CardBack: CardBackUrl, CardImageUrl: GetCardUrl("WavyLines", "Magenta"), Showing: false },
        ]
    },

    //Concept of a game state:
    GameState: "Playing",
    Turns: [],
    CurrentStage: "FirstPick",
    SuccessCount: 0,
    
    clickCard: function (data) {
        if (KO_Memory.viewModel.CurrentStage() == "FirstPick") {
            firstCardPick = data;
            KO_Memory.viewModel.CurrentStage("SecondPick");
        } else if (KO_Memory.viewModel.CurrentStage() == "SecondPick") {
            var success = false;
            if (firstCardPick.Name() == data.Name()) {
                KO_Memory.viewModel.SuccessCount(KO_Memory.viewModel.SuccessCount() + 1);
                success = true;
            } else {
                setTimeout((function (firstCardPick, data) {
                    return function(){
                        KO_Memory.viewModel.FlipCard(firstCardPick);
                        KO_Memory.viewModel.FlipCard(data);
                    }
                })(firstCardPick, data), 1000);
            }
            KO_Memory.viewModel.AddTurn(ko.observable({FirstPick: firstCardPick, SecondPick: data, Success: success}));
            firstCardPick = {};
            if (KO_Memory.viewModel.SuccessCount() >= (KO_Memory.viewModel.GameBoard().length / 2)) {
                //Game won
                KO_Memory.viewModel.GameState("GameWon");
            }
            KO_Memory.viewModel.CurrentStage("FirstPick");
        }
        KO_Memory.viewModel.FlipCard(data);
    },
    clickNewGame: function (data) {
        KO_Memory.viewModel.ResetGame();
    },
}
var KO_Memory = {    
    GameBoard: [],
    GameState: {},
    viewModel: {
        Cards: [],
        GameBoard: [],
        GameState: {},
        CurrentStage: "",
        Turns: [],
        SuccessCount: 0,
        ChangeGameBoard: function (data) {
            for (var i = 0; i < data.length; i++) {
                this.GameBoard.push(this.NewCardItem({ 
					Id: data[i]().Id, 
					Name: data[i]().Name(), 
					CardBack: data[i]().CardBack, 
					CardImageUrl: data[i]().CardImageUrl, 
					Showing: data[i]().Showing() 
				}));
            }
        },
        ClearGameBoard: function () {
            this.GameBoard.removeAll();
        },
        FlipCard: function (data) {
            data.Showing(!data.Showing());
        },
        ChangeGameState: function(newGameState){
            this.GameState(newGameState);
        },
        AddTurn: function(turn){
            this.Turns.push(turn);
        },
        NewCardItem: function (data) {
            var returnvalue = {};
            returnvalue.Id = ko.observable(data.Id);
            returnvalue.Name = ko.observable(data.Name);
            returnvalue.CardBack = ko.observable(data.CardBack);
            returnvalue.CardImageUrl = ko.observable(data.CardImageUrl);
            returnvalue.Showing = ko.observable(data.Showing);
            return returnvalue;
        },
        ResetGame: function () {
            this.Turns.removeAll();
            this.SuccessCount(0);
            this.ClearGameBoard();
            this.ChangeGameBoard(ReturnGameBoard(Memory.TestData.Cards, 8));
            this.ChangeGameState("Playing");
        }
    },
    bind: function () {
        this.viewModel.GameBoard = ko.observableArray(Memory.GameBoard);
        this.viewModel.GameState = ko.observable(Memory.GameState);
        this.viewModel.Turns = ko.observableArray(Memory.Turns);
        this.viewModel.CurrentStage = ko.observable(Memory.CurrentStage);
        this.viewModel.SuccessCount = ko.observable(Memory.SuccessCount);
        ko.applyBindings(this.viewModel)
    }
}