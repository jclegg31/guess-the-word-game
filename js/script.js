//Create global variables to select elements to work with
const guessedLetters = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const guessProgress = document.querySelector(".word-in-progress");
const remainingGuess = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector("play-again hide");
const word = "magnolia";
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

    //variable to catch the value of the guessed letter
    const guess = guessInput.value;
    //check to see if it logged your guess
    console.log(guess);
    //empty the box where the letter is guessed
    guessInput.value = "";
});


