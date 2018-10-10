// Javascript for Number Guesser

// ZERO STATE
// Set initial custom range from range text and generate first random number in that range.
var minRangeInputInitial = parseInt(document.querySelector('.min-range-text').innerText);
var maxRangeInputInitial = parseInt(document.querySelector('.max-range-text').innerText);


var randomNumber = assignRandomNumber(minRangeInputInitial, maxRangeInputInitial);
console.log('The initial random number is: ' + randomNumber);

function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

// Get custom range inputs from user and update min/max range and text when update button is clicked.
var updateButton = document.querySelector('.update-button');
updateButton.addEventListener('click', getNewMinMax);

function getNewMinMax() {
  var minRangeInputNew = parseInt(document.querySelector('.min-range-input').value);
  var maxRangeInputNew = parseInt(document.querySelector('.max-range-input').value);

  randomNumber = assignRandomNumber(minRangeInputNew, maxRangeInputNew);
  console.log('The updated random number is: ' + randomNumber);
  
  document.querySelector('.min-range-text').innerText = minRangeInputNew;
  document.querySelector('.max-range-text').innerText = maxRangeInputNew;
};

// Get user's new guess when submit guess button is clicked,  displays that guess and the result
var submitButton = document.querySelector('.submit-button');
var guessInputBox = document.querySelector('.lg-input-box');
var displayRecentGuess = document.querySelector('.guess-number');
var displayResult = document.querySelector('.guess-result');

submitButton.addEventListener('click', getUserGuess);

function getUserGuess() {
  var usersGuess = guessInputBox.value;
  console.log('The users guess is: ' + usersGuess);
  clearGuessInput();
  displayRecentGuess.innerText = usersGuess;

    if (usersGuess > randomNumber) {
    displayResult.innerText = 'Sorry, that is too High';
  } else if (usersGuess < randomNumber){
    displayResult.innerText = 'Sorry, that is too low';
  } else {
    displayResult.innerText = 'BOOM!'
  }
};

// Interactive clear button to clear user guess input field
var clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click', clearGuessInput);

function clearGuessInput() {
  guessInputBox.value = '';
};

// Interactive reset button to reset game - done in HTML

// disabling clear button and adding styling change when no text in the guess input
//putting the clear back to original state if there is something there isn't working now
if (guessInputBox.innerText === '') {
  clearButton.disabled = true;
  clearButton.classList.add('disable-clear');
} else {
  clearButton.disabled = false;
  clearButton.classList.remove('disable-clear');
}






