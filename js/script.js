//Create global variables to select elements to work with
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const guessProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector("play-again hide");
const word = "magnolia";
//This array will contain all the letters the player guesses. 
const guessedLetters = [];
//console.log(playAgain);

//Function to Add Placeholders for Each Letter
//create a funcion to update the paragraphs innerText
//for the word-in-progress element with the ● symbol
const placeHolder = function (word) { 
    //create empty array
    const placeholderLetters = [];
    
    //for each letter of the word parameter  
    //push a ● into the placeholderLetters array
    for (const letter of word) { 
        //console.log(letter);
        placeholderLetters.push("●");
    };

    //set the innerText of the word-in-progress element
    //then use join to create a string to concatenate
    //all the elements of the array. 
    guessProgress.innerText = placeholderLetters.join("");
    
};

placeHolder(word); 

//Add Event Listener for the Button
guessBtn.addEventListener("click", function (e){ 
    //Because working with a form, this prevents default behavior 
    //of clicking a button, the form submitting and reloading the page
    e.preventDefault();
    //empty message text
    message.innerText = "";

    //variable to catch the value of the guessed letter
    const guess = guessInput.value;
//here
    const goodGuess = valInput(guess);

    //check to see if it logged your guess
    console.log(guess);
    if (goodGuess) { 
        //This is a letter, let's guess!
        makeGuess(guess);
    }
    //empty the box where the letter is guessed
    guessInput.value = "";


});

//Function to validate the player's input
const valInput = function (input) { 
    //variable for the accepted letter sequence
    //this reg expression ensures player inputs a letter
    const acceptedLetter = /[a-zA-Z]/;

    //create conditional block to check for diff scenarios.
     //then check if they entered a letter that doesn't match the 
    //regular expresson pattern. use .match() method.
    //Each condition should have its own message about what player
    //should input.
    
    
    if (input.length === 0) { //is input empty? 
        message.innerText = "Please enter a single letter.";
    } else if (input.length > 1) { //is input more than one letter? 
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) { //does letter not match reg expression. Checking for other charctiers outside of a-zA-z 
        message.innerText = "Please enter a letter from A to Z.";
    } else { 
        //if all other conditions arne't met, then it's a letter 
        //return the input
        return input;
    }
};

const makeGuess = function (guess) { 
    guess = guess.toUpperCase();
    //if they have guessed letter, update message
    //if not, add to the guessedLetters array
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have guessed that letter, try again!";
    } else { 
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

