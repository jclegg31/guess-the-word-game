//Create global variables to select elements to work with
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const guessProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector("play-again hide");

let word = "magnolia"; //change from const to let to update word from list
const guessedLetters = []; //This array will contain all the letters the player guesses. 
let remainingGuesses = 8;


const getWord = async function () { 
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text(); //instead of json, using a text file
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim(); //no blank spaces
    placeHolder(word);
};

//make the game start
getWord();

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

//placeHolder(word); 

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
        //push the guess onto the array
        guessedLetters.push(guess);
        //call function to show the letter when it has not
        //been guessed before
        guessesLeft(guess);
        updateGuesses();
        updateWord(guessedLetters);
    }
};

const updateGuesses = function () { 
    //empty the innerHTML of the ul where they players
    //guessed letters will display
    guessedLettersElement.innerHTML = "";

    //create a new list item for each letter inside your array
    for (const letter of guessedLetters) { 
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }

};

//This function will replace the circle symbols 
//with the correct letters guessed.
const updateWord = function (guessedLetters) { 
    const wordUpper = word.toUpperCase();
    //split the word string into an array so that
    //the letter can appear in the guessedLetters array
    const wordArray = wordUpper.split("");
    console.log(wordArray);

    //check if wordArray has any of the letters from guessedLetters
    //if so update the circle symbol with the correct letter
    //create new array with updated characters and then use join()
    //to update the empty paragraph where the word in progress is
    const showWord = [];
    for (const letter of wordArray) { 
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else { 
            showWord.push("●");
        }
    }
    guessProgress.innerText = showWord.join("");
    checkIfWon();
};



//Count guesses remaining
const guessesLeft = function (guess) { 
    const guessedWord = word.toUpperCase();
    if (!guessedWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else { 
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuess === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuess === 1) { 
        //update the span in the paragraph to say one try left
        remainingGuess.innerText = `${remainingGuesses} guess`;
    } else { 
        //update span to say how many guesses remaining
        remainingGuess.innerText = `${remainingGuesses} guesses`;
    }
};



//see if player won
const checkIfWon = function () { 
    //verify if word in progress matches the word they should guess
    //if player won, add "win" class to empty paragraph where the 
    //messages appear.
    if (word.toUpperCase() === guessProgress.innerText) { 
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};