// Javascript for Number Guesser

// Set initial custom range from range text and generate first random number in that range.
var minRangeInputInitial = parseInt(document.querySelector('.min-range-text').innerText);
var maxRangeInputInitial = parseInt(document.querySelector('.max-range-text').innerText);
var currentRangeArray = [minRangeInputInitial, maxRangeInputInitial];

// Get error message elements as an array
var errorMessages = document.querySelectorAll('.error-message');

var randomNumber = assignRandomNumber(minRangeInputInitial, maxRangeInputInitial);
console.log('The initial random number is: ' + randomNumber);

function assignRandomNumber(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
};

// Get custom range inputs from user and update min/max range and text when update button is clicked. 
// Also give error messages if values are missing/not valid.
var updateButton = document.querySelector('.update-button');
updateButton.addEventListener('click', getNewMinMax);

function getNewMinMax() {
  errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Enter a min range';
  var minRangeInput = document.querySelector('.min-range-input').value;
  var maxRangeInput = document.querySelector('.max-range-input').value;

  var minRangeInputNew = parseInt(minRangeInput);
  var maxRangeInputNew = parseInt(maxRangeInput);

  if ((minRangeInput === '') || (maxRangeInput === '')) {
    if (minRangeInput === '') {
      errorMessages[0].classList.add('displayError');
    };

    if (maxRangeInput === '') {
      errorMessages[1].classList.add('displayError');
    };
  } else if (minRangeInputNew > maxRangeInputNew || maxRangeInputNew < minRangeInputNew) {
    changeRangeErrorText();
  } else {
    randomNumber = assignRandomNumber(minRangeInputNew, maxRangeInputNew);
    errorMessages[0].classList.remove('displayError');
    errorMessages[1].classList.remove('displayError');
    console.log('The updated random number is: ' + randomNumber);
    
    document.querySelector('.min-range-text').innerText = minRangeInputNew;
    document.querySelector('.max-range-text').innerText = maxRangeInputNew;

    currentRangeArray = [minRangeInputNew, maxRangeInputNew];
    return currentRangeArray
  };
};

// Get user's new guess when submit guess button is clicked, displays that guess and the result. 
// Also sends error messages if values are missing or not valid.
var submitButton = document.querySelector('.submit-button');
var guessInputBox = document.querySelector('.lg-input-box');
var displayRecentGuess = document.querySelector('.guess-number');
var displayResult = document.querySelector('.guess-result');

submitButton.addEventListener('click', getUserGuess);

function getUserGuess() {
  errorMessages[2].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Guess is not a number, enter a guess';
  var usersGuess = guessInputBox.value;
  console.log('The users guess is: ' + usersGuess);
  clearGuessInput();


  if (usersGuess === '') {
    errorMessages[2].classList.add('displayError');
  } else if (parseInt(usersGuess) < currentRangeArray[0] || parseInt(usersGuess) > currentRangeArray[1]) {
    changeGuessErrorText();
  } else {
    displayRecentGuess.innerText = usersGuess;
    errorMessages[2].classList.remove('displayError');

    if (usersGuess > randomNumber) {
      displayResult.innerText = 'Sorry, that is too High';
    } else if (usersGuess < randomNumber) {
      displayResult.innerText = 'Sorry, that is too low';
    } else {
      displayResult.innerText = 'BOOM!';
    };
  };
};

// Interactive clear button to clear user guess input field.
// Also disable/enable clear button with input.
var clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click', clearGuessInput);

function clearGuessInput() {
  guessInputBox.value = '';
  clearButton.disabled = true;
};

clearButton.disabled = true;

//When the user inputs their guess into guess input box, the clear button is enabled
guessInputBox.addEventListener('input', enableClearButton);

function enableClearButton () {
 clearButton.disabled = false;
};

// Interactive reset button to reset game - done in HTML
//setting reset button to disable state
var resetButton = document.querySelector('.reset-button');
resetButton.disabled = true;

//when the user inputs something in guess, min or max input boxes this enables the reset button
var minInputBox = document.getElementById('min-input-box');
var maxInputBox = document.getElementById('max-input-box');
guessInputBox.addEventListener('input', enableResetButton);
minInputBox.addEventListener('input', enableResetButton);
maxInputBox.addEventListener('input', enableResetButton)

function enableResetButton () {
 resetButton.disabled = false;
};

// Functions to change error messages
function changeRangeErrorText() {
  errorMessages[0].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Min is greater than max, enter new range';
  errorMessages[1].classList.remove('displayError');
  errorMessages[0].classList.add('displayError');
};

function changeGuessErrorText() {
  errorMessages[2].innerHTML = '<img class="error-icon" src="error-icon.svg" alt="error message icon"> Guess is outside current range';
  errorMessages[2].classList.add('displayError');
};

